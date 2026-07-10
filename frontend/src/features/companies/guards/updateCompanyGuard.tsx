import { Navigate, Outlet, useNavigate, useParams } from "react-router";
import { useRole } from "../../../context/RoleContext";
import { getAuthToken } from "../../auth/hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

const allowedRoles = ["admin", "owner"]; // Define the allowed roles for updating company details

export function UpdateCompanyRouteGuard() {
  const companyId = useParams<{ companyId: string }>().companyId;
  const navigate = useNavigate();
  const { userRole } = useRole();

  const hasAccess =
    typeof userRole === "string" && allowedRoles.includes(userRole);

  const token = getAuthToken()

  useEffect(() => {
    if (!token) {
      toast.info("You must log in first.");
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== undefined && !hasAccess) {
      toast.error("Only admins and owners can edit company details.");
      navigate(`/company/${companyId}/dashboard`, { replace: true });
    }
  }, [token, userRole, hasAccess, navigate]);

  if (!token) {
    return null;
  }

  if (userRole === undefined) {
    return null;
  }

  if (!hasAccess) {
    return null;
  }

  return <Outlet />;
}
