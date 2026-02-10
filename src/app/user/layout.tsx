import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function UserLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <ProtectedRoute requiredRoles={ [ "user" ]}>
      { children }
    </ProtectedRoute>
  );
}
