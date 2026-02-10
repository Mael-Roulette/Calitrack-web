"use client";

import RoleSelection, { UserRole } from "@/components/auth/RoleSelection";
import { updateUserRoles } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = async (roles: UserRole[]) => {
  try {
    await updateUserRoles(roles);

    router.push(
      roles.includes("coach")
        ? "/coach/dashboard"
        : "/user/dashboard"
    );
  } catch (error) {
    console.error(error);
  }
};

  return <RoleSelection onSelectRole={handleRoleSelection} isLoading={false} />;
}