"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/authService";
import { UserDoc } from "@/types/user";

export default function ProtectedRoute({
  children,
  requiredRoles
}: {
  children: React.ReactNode,
  requiredRoles?: UserDoc["roles"]
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();

      console.log( user)

      if (!user) {
        router.push("/authentication");
        return;
      }

      // Logique de redirection forcée si pas de rôle
      if (user.roles.length === 0) {
        router.push("/role-selection");
        return;
      }

      // Vérification des accès spécifiques
      if (user.roles.includes("coach")) {
        router.push("/user/dashboard"); // Redirige vers user si pas coach
        return;
      }

      setLoading(false);
    };
    
    checkAuth();
  }, [router, requiredRoles]);

  if (loading) return <div className="h-screen flex items-center justify-center">Chargement...</div>;

  return <>{children}</>;
}