import { ID, account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

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
    await account.create({userId: ID.unique(), email, password, name});

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
    return await account.get();
  } catch (error) {
    return null;
  }
};