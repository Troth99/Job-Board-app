import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";
import { LoginFormType } from "../components/auth/Login/Login";
import { error } from "console";
import ResetPassword from "../components/auth/Reset-password/Reset-password";

export interface registerFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  location: string;
  [key: string]: string;
}

export default function useAuth() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const loginUser = async (data: LoginFormType) => {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/users/login`, "POST", data);
      return response;
    } catch (err: any) {
      if (err.message) {
        throw new Error(err.message);
      } else {
        throw new Error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: registerFormType) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = data;
      const response = await request(
        `${API_BASE}/users/register`,
        "POST",
        registrationData,
        {},
      );
      return response;
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        localStorage.removeItem("user");
        return true;
      }

      const response = await request(`${API_BASE}/users/logout`, "POST", {
        refreshToken,
      });

      if (response) {
        localStorage.removeItem("user");
        return true;
      }
    } catch (error) {
      console.error("Logout error", error);
      localStorage.removeItem("user");
      return true;
    } finally {
      setLoading(false);
    }
  };

  const sendResetPasswordLink = async (email: string) => {
    setLoading(true);
    try {
      if (!email) {
        throw new Error("Email is not valid.");
      }

      const response = await request(
        `${API_BASE}/users/forgot-password`,
        "POST",
        { email },
        {},
        false,
      );
   
      return response;
    } catch (error: any) {
      if(error.message === 'User not found'){
       throw new Error(error.message)
      }
      throw new Error("Sending password link failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Token does not exist");
      }
      if (!newPassword) {
        throw new Error("New password does not exist");
      }
      const response = await request(
        `${API_BASE}/users/reset-password/${token}`,
        "POST",
        { newPassword },
      );
 
      return response;
    } catch (error: any) {
      throw new Error("Reseting password has failed", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    loginUser,
    registerUser,
    logOut,
    sendResetPasswordLink,
    resetPassword,
  };
}

// Helper functions (not hooks, can be used anywhere)
export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${API_BASE}/users/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
}

export function updateTokensInStorage(
  accessToken: string,
  refreshToken?: string,
) {
  const user = getUserFromLocalStorage();

  const updatedUser = {
    ...user,
    accessToken,
    ...(refreshToken && { refreshToken }),
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
}

export function getAuthToken(): string | null {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.accessToken;
}

export function getRefreshToken(): string | null {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.refreshToken;
}

export function getUserFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user;
}
