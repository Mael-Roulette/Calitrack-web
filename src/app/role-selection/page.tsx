"use client";

import RoleSelection from "@/components/auth/RoleSelection";
import { useRouter } from "next/navigation";

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = async ( role: any) => {
    try {
      redirectToDashboard(role);
    } catch (error) {
      console.error("Erreur lors de la sélection du rôle:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const redirectToDashboard = ( role : any ) => {
    switch (role) {
      case "coach":
        router.push("/coach/dashboard");
        break;
      case "user":
        router.push("/user/dashboard");
        break;
      default:
        router.push("/");
        break;
    }
  };

  return <RoleSelection onSelectRole={handleRoleSelection} isLoading={false} />;
}