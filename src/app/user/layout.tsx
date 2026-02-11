import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TanstackProvider } from "@/components/providers/TanstackProvider";

export default function UserLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <ProtectedRoute requiredRoles={ [ "user" ]}>
      <TanstackProvider>
        { children }
      </TanstackProvider>
    </ProtectedRoute>
  );
}
