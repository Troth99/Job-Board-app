import { useEffect, useState } from "react";
import { API_BASE } from "../../services/api";
import useApiRequester from "../common/useApiRequester";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  createdAt?: string;
  company?: string;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

export default function useProfile() {
  const { loading, error, request } = useApiRequester();
  const [userData, setUserData] = useState<User | null>(null);

  const getLoggedInUserData = async () => {
    try {
      const result = await request(`${API_BASE}/users/me`, "GET");
      setUserData(result);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateUserProfile = async (data: {
    avatar?: string;
    [key: string]: any;
  }) => {
    try {
      const response = await request(`${API_BASE}/users/me`, "PUT", data);
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile.");
    }
  };

  const changePassword = async (data: ChangePasswordForm) => {
    try {
      const response = await request(
        `${API_BASE}/users/change-password`,
        "PUT",
        data
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Network error");
    }
  };

  const handleDeleteProfile = async (onSuccess?: () => void) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (!isConfirmed) return false;

    const password = window.prompt(
      "Please enter your password to confirm the deletion:"
    );
    if (!password) {
      alert("Password is required to delete the profile.");
      return false;
    }

    try {
      await deleteUserProfile();
      localStorage.removeItem("user");
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      console.error("Failed to delete profile:", error);
      throw error;
    }
  };

  const deleteUserProfile = async () => {
    try {
      const response = await request(`${API_BASE}/users/me`, "DELETE");
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Network error");
    }
  };

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  return {
    loading,
    userData,
    error,
    getLoggedInUserData,
    updateUserProfile,
    changePassword,
    handleDeleteProfile,
    deleteUserProfile,
  };
}
