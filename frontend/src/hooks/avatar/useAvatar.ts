import { useState } from "react";
import useApiRequester from "../shared/useApiRequester";
import { API_BASE } from "../../services/api";

export default function useAvatar() {
  const { request } = useApiRequester();
  const [avatar, setAvatar] = useState<string>("");

  const uploadUserProfileImage = async (file: File): Promise<string> => {
    const apiKey = "844b750f8696c887633d12684dff203e";
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) throw new Error("Upload failed");
    return data.data.url;
  };

  const deleteUserProfileImage = async () => {
    try {{API_BASE}
      const response = await request(`/users/me/avatar`, "DELETE");
      return response;
    } catch (error: any) {
      console.error("Error deleting user profile image:", error.message);
      throw new Error("Failed to delete profile image.");
    }
  };

  const handleFileChange = async (file: File) => {
    try {
      const imageUrl = await uploadUserProfileImage(file);
      setAvatar(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const handleDeleteProfileImage = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile image?"
    );
    if (!isConfirmed) return false;

    try {
      await deleteUserProfileImage();
      setAvatar("");
      return true;
    } catch (error) {
      console.error("Failed to delete profile image:", error);
      throw error;
    }
  };

  return {
    avatar,
    setAvatar,
    uploadUserProfileImage,
    deleteUserProfileImage,
    handleFileChange,
    handleDeleteProfileImage,
  };
}
