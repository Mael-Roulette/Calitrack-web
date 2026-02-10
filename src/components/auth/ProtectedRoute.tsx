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

      if (!user) {
        router.push("/authentication");
        return;
      }

      if (user.roles.length === 0) {
        router.push("/role-selection");
        return;
      }

      if (requiredRoles && !requiredRoles.some(r => user.roles.includes(r))) {
        router.push("/unauthorized");
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, requiredRoles]);

  if (loading) return <div className="h-screen flex items-center justify-center">Chargement...</div>;

  return <>{children}</>;
}