import { useEffect, useState } from "react";
import { API_BASE } from "../services/api";
import useApiRequester from "./useApiRequester";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  location?: string;
  avatar?: string;
  createdAt?: string;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

function useUserProfile() {
  const { loading, data, error, request } = useApiRequester();
  const [userData, setUserData] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string>("");

  const getLoggedInUserData = async () => {
    try {
      const result = await request(`${API_BASE}/users/me`, "GET");
      setUserData(result);
      setAvatar(result.avatar || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const uploadUserProfileImage = async (file: File): Promise<string> => {
    const apiKey = "844b750f8696c887633d12684dff203e";
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.success) throw new Error("Upload failed");
    return data.data.url;
  };


  const updateUserProfile = async (data: { avatar?: string; [key: string]: any }) => {
    try {
      const response = await request(`${API_BASE}/users/me`, "PUT", data);
      return response;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile.");
    }
  };

 
  const deleteUserProfileImage = async () => {
    try {
      const response = await request(
        `${API_BASE}/users/me/avatar`,
        "DELETE"
      );
      return response;
    } catch (error: any) {
      console.error("Error deleting user profile image:", error.message);
      throw new Error("Failed to delete profile image.");
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
  const handleFileChange = async (file: File) => {
    try {
      const imageUrl = await uploadUserProfileImage(file);  
      setAvatar(imageUrl);  
      await updateUserProfile({ avatar: imageUrl }); 
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  const handleDeleteProfileImage = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your profile image?");
    if (!isConfirmed) return false;

    try {
      await deleteUserProfileImage();
      setAvatar("");
      setUserData(prev => prev ? { ...prev, avatar: "" } : null);
      return true;
    } catch (error) {
      console.error("Failed to delete profile image:", error);
      throw error;
    }
  };

  const handleDeleteProfile = async (onSuccess?: () => void) => {
    const isConfirmed = window.confirm("Are you sure you want to delete your profile?");
    if (!isConfirmed) return false;
    
    const password = window.prompt("Please enter your password to confirm the deletion:");
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
      const response = await request(
        `${API_BASE}/users/me`,
        "DELETE"
      );
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
    avatar,
    error,
    handleFileChange,
    handleDeleteProfileImage,
    handleDeleteProfile,
    uploadUserProfileImage,
    updateUserProfile,
    deleteUserProfileImage,
    changePassword,
    deleteUserProfile,
  };
}

export default useUserProfile;
