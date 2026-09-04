import { useEffect, useState } from "react";
import { API_BASE } from "../../../config/api";
import useApiRequester from "../../../shared/hooks/useApiRequester";
import { ChangePasswordForm, User } from "../types/profileSectionTypes";
import { useLingui } from "@lingui/react/macro";
import { getUserFromLocalStorage } from "../../auth/hooks/useAuth";

export default function useProfile() {
  const { loading, error, request } = useApiRequester();
  const [userData, setUserData] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      setIsInitialized(true);
      return;
    }

    getLoggedInUserData();
  }, []);

  const { t } = useLingui();

  const getLoggedInUserData = async () => {
    try {
      const result = await request(`${API_BASE}/users/me`, "GET");
      setUserData(result);
      return result;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsInitialized(true);
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
        data,
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Network error");
    }
  };

  const handleDeleteProfile = async (onSuccess?: () => void) => {
    const isConfirmed = window.confirm(
      t`Are you sure you want to delete your profile?`,
    );
    if (!isConfirmed) return false;

    const password = window.prompt(
      t`Please enter your password to confirm the deletion:`,
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

  return {
    loading,
    isInitialized,
    userData,
    error,
    getLoggedInUserData,
    updateUserProfile,
    changePassword,
    handleDeleteProfile,
    deleteUserProfile,
  };
}
