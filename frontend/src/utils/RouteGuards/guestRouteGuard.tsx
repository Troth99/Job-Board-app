import { Navigate, Outlet } from "react-router";
import { getAuthToken } from "../../services/auth/authService";


export default function GuestGuardRoute () {
    const token = getAuthToken();

    if(token){
        return <Navigate to ="/profile" replace />
    }

    return <Outlet />
}