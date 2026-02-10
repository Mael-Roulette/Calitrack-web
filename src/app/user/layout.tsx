import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CoachLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <ProtectedRoute requiredRoles={ [ "coach" ]}>
      { children }
    </ProtectedRoute>
  );
}
