"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loginUser,
  registerUser,
  getCurrentUser, // Nouvelle fonction pour récupérer rôles + infos
  getRedirectPath, // Logique de redirection
  UserDoc
} from "@/services/authService";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

type AuthMode = "login" | "register";

export default function AuthenticationPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true pour check session
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // 1. Vérifier la session au chargement
  useEffect(() => {
    const initAuth = async () => {
      const user = await getCurrentUser();
      if (user) {
        // Redirection immédiate si session active
        const path = getRedirectPath(user.roles);
        router.push(path);
      } else {
        setIsLoading(false); // On arrête de charger pour montrer le formulaire
      }
    };
    initAuth();
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      await loginUser(email, password);
      const user = await getCurrentUser(); // Récupère le doc DB avec les rôles

      if (user) {
        const path = getRedirectPath(user.roles);
        router.push(path);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    setError("");
    setIsLoading(true);

    try {
      await registerUser(email, password, name);
      // Après inscription, le rôle est vide [] donc redirect vers role-selection
      router.push("/role-selection");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'inscription");
      setIsLoading(false);
    }
  };

  // Affichage d'un loader pendant la vérification de session initiale
  if (isLoading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground">
        <div className="text-background animate-pulse text-xl">Vérification de session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t lg:bg-radial-[at_50%_90%] from-[#4E63D7] from-3% to-foreground to-80% lg:to-70% py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="title-hero font-bold text-center text-background">Calitrack</h1>
          <p className="mt-2 text-center text-background">
            {mode === "login" ? "Connectez-vous" : "Créez votre compte"}
          </p>
        </div>

        <div className="bg-background rounded-lg shadow-md p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                mode === "login" ? "border-b-2 border-light-blue text-light-blue" : "text-gray-500"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                mode === "register" ? "border-b-2 border-secondary text-secondary" : "text-gray-500"
              }`}
            >
              Inscription
            </button>
          </div>

          {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

          {mode === "login" ? (
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}