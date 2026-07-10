import { Navigate, Outlet, useLocation } from "react-router";
import { getAuthToken } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function GuestGuardRoute() {
  const token = getAuthToken();
  // sessionStorage flag to detect login navigation
  const fromLogin = sessionStorage.getItem("fromLogin");

  useEffect(() => {
    if (token && !fromLogin) {
      toast.info("You are already logged in!");
    }
    if (fromLogin) sessionStorage.removeItem("fromLogin");
  }, [token]);

  if (token && !fromLogin) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
