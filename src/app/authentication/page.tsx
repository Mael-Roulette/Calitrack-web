"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, getCurrentUser } from "@/services/authService";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

type AuthMode = "login" | "register";

interface User {
  $id: string;
  name: string;
  email: string;
}

export default function AuthenticationPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    checkUser();
  }, []);

  // Rediriger selon le statut de l'utilisateur
  useEffect(() => {
    if (loggedInUser) {
      // Ajouter la redirection
    }
  }, [loggedInUser, router]);

  const checkUser = async () => {
    const user = await getCurrentUser();
    setLoggedInUser(user);
  };

  const handleLogin = async (email: string, password: string) => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await loginUser(email, password);
      const user = await getCurrentUser();
      setLoggedInUser(user);
      setSuccessMessage("Connexion réussie !");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await registerUser(email, password, name);
      const user = await getCurrentUser();
      setLoggedInUser(user);
      setSuccessMessage("Inscription réussie !");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t lg:bg-radial-[at_50%_90%] from-[#4E63D7] from-3% to-foreground to-80% lg:to-70% py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="title-hero font-bold text-center text-background">
            Calitrack
          </h1>
          <p className="mt-2 text-center text-background">
            {mode === "login"
              ? "Connectez-vous à votre compte"
              : "Créez votre compte"}
          </p>
        </div>

        <div className="bg-background rounded-lg shadow-md p-6">
          {/* Onglets de navigation */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => {
                setMode("login");
                setError("");
                setSuccessMessage("");
              }}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                mode === "login"
                  ? "border-b-2 border-light-blue text-light-blue"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setMode("register");
                setError("");
                setSuccessMessage("");
              }}
              className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${
                mode === "register"
                  ? "border-b-2 border-secondary text-secondary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Messages d'erreur et de succès */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Formulaires */}
          {mode === "login" ? (
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          )}
        </div>

        {/* Lien de retour */}
        <div className="text-center">
          <a
            href="/"
            className="text-background underline hover:opacity-70 transition-all"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}