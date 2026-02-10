"use client";

import { getCurrentUser } from "@/services/authService";
import { logoutUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    checkUser();
  }, []);

  // Rediriger vers l'authentification si pas connecté
  useEffect(() => {
    if (!isLoading && !loggedInUser) {
      router.push("/authentication");
    }
  }, [loggedInUser, isLoading, router]);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      setLoggedInUser(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError("");

    try {
      await logoutUser();
      setLoggedInUser(null);
      router.push("/authentication");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de déconnexion");
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  // Ne rien afficher si pas connecté, la redirection se fera
  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de bord
              </h1>
              <p className="text-gray-600">
                Bienvenue, <span className="font-semibold">{loggedInUser.name}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Déconnexion..." : "Se déconnecter"}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Informations du compte</h2>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Email :</span>{" "}
                <span className="font-medium">{loggedInUser.email}</span>
              </div>
              <div>
                <span className="text-gray-600">ID :</span>{" "}
                <span className="font-mono text-sm">{loggedInUser.$id}</span>
              </div>
            </div>
          </div>

          {/* Section pour ajouter du contenu futur */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Mes athlètes</h2>
            <p className="text-gray-500 italic">
              Cette section sera bientôt disponible...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}