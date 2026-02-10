import { ID, account, tablesDB } from "@/lib/appwrite";
import { UserDoc } from "@/types/user";
import { AppwriteException, Query } from "appwrite";

// Types pour les erreurs
export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

// Messages d'erreur personnalisés en français
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppwriteException) {
    switch (error.code) {
      case 401:
        return "Email ou mot de passe incorrect";
      case 409:
        return "Un compte avec cet email existe déjà";
      case 429:
        return "Trop de tentatives, veuillez réessayer plus tard";
      default:
        return error.message || "Une erreur est survenue";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Une erreur inconnue est survenue";
};

/**
 * Connexion d'un utilisateur
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession({email, password});
    return { success: true, session };
  } catch (error) {
    const message = getErrorMessage(error);
    throw new AuthError(message);
  }
};

/**
 * Inscription d'un nouvel utilisateur
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // Créer le compte
    const newAccount = await account.create({userId: ID.unique(), email, password, name});

    await tablesDB.createRow({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      tableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        email,
        name,
        accountId: newAccount.$id
      }
    })

    // Connexion automatique après l'inscription
    return await loginUser(email, password);
  } catch (error) {
    const message = getErrorMessage(error);
    throw new AuthError(message);
  }
};

/**
 * Déconnexion de l'utilisateur
 */
export const logoutUser = async () => {
  try {
    await account.deleteSession({sessionId: "current"});
    return { success: true };
  } catch (error) {
    const message = getErrorMessage(error);
    throw new AuthError(message);
  }
};

/**
 * Récupérer l'utilisateur actuellement connecté
 */
export const getCurrentUser = async () => {
  try {
    const authAccount = await account.get();

    // Récupérer le document dans la collection "users" via l'accountId
    const currentUser = await tablesDB.listRows( {
			databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			tableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
			queries: [ Query.equal( "accountId", authAccount.$id ) ]
		} )

    return currentUser.rows[0] as unknown as UserDoc;
  } catch (error) {
    return null;
  }
};

/**
 * Logique de redirection selon les rôles
 */
export const getRedirectPath = (roles: string[]) => {
  if (!roles || roles.length === 0) return "/role-selection";
  if (roles.includes("coach")) return "/coach/dashboard";
  if (roles.includes("user") || roles.includes("student")) return "/user/dashboard";
  return "/role-selection";
};

/**
 * Permet de mettre à jour les rôles de l'utilisateur
 * @param roles rôle à ajouter
 */
export const updateUserRoles = async (roles: string[]) => {
  const currentUser = await getCurrentUser();
    if (!currentUser) return;

    // Trouver le doc utilisateur
    const userDocs = await tablesDB.listRows({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      tableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      queries: [Query.equal("accountId", currentUser.accountId)]
    });

    console.log( userDocs )

    // Mettre à jour le rôle
    await tablesDB.updateRow({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      tableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      rowId: userDocs.rows[0].$id,
      data: { roles }
    });
}