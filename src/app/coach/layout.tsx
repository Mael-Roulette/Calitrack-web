import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TanstackProvider } from "@/components/providers/TanstackProvider";

export default function CoachLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <ProtectedRoute requiredRoles={ [ "coach" ]}>
      <TanstackProvider>
        { children }
      </TanstackProvider>
    </ProtectedRoute>
  );
}
