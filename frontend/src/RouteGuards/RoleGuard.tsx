import { Navigate } from "react-router";
import { useRole } from "../context/RoleContext";


export function RoleGuard({ allowedRoles, children }: {
  allowedRoles: string[],
  children: React.ReactNode
}) {
  const { userRole } = useRole();
  if (userRole == null) {
    return <>{children}</>;
  }
console.log(userRole)
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }
  return <>{children}</>;
}