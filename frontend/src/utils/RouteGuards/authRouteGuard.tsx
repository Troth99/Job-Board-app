
import { useEffect } from "react";
import { getAuthToken } from "../../hooks/useAuth";
import { Navigate, Outlet, replace, useNavigate } from "react-router";
import {toast} from "react-toastify"


export default function AuthGuardRoute() {
  const token = getAuthToken();

  useEffect(() => {
    if(!token){
        toast.info('You must log in, in order to view this page!')
    }
  }, [token])

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}