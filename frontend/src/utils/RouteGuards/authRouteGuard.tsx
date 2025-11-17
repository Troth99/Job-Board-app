
import { getAuthToken } from "../../services/auth/authService";
import { Navigate, Outlet, replace, useNavigate } from "react-router";



export default function AuthGuardRoute() {
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}