import { Navigate, Outlet } from "react-router";
import { getAuthToken } from "../../services/auth/authService";
import {toast } from "react-toastify"
import { useEffect } from "react";


export default function GuestGuardRoute () {
    const token = getAuthToken();

    useEffect(() => {
        if(token) {
            toast.info('You are already logged in!')
        }
    }, [token])
    
    if(token){
        
        return <Navigate to ="/profile" replace />
    }

    return <Outlet />
}