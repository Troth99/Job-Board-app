import { changePasswordForm } from "../components/EditProfile/ChangePassword/ChangePassword";
import { sendRequest } from "../utils/requester";
import { API_BASE } from "./api";
import { getAuthToken } from "./auth/authService";


export async function getUserProfile() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await sendRequest(
      `${API_BASE}/users/me`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    throw new Error(error?.message || "Failed to fetch user data.");
  }
}

export async function uploadUserProfileImage(file: File): Promise<string> {
  const apiKey = "844b750f8696c887633d12684dff203e";
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) throw new Error("Upload failed");
  console.log(data.data.url);
  return data.data.url;
}

export async function updateUserProfile(data: {
  avatar?: string;
  [key: string]: any;
}) {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  return sendRequest(`${API_BASE}/users/me`, "PUT", data, {
    Authorization: `Bearer ${token}`,
  });
}

export async function deleteUserProfileImage() {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  try {
    const response = await sendRequest(
      `${API_BASE}/users/me/avatar`,
      "DELETE",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response;
  } catch (error: any) {
    console.error("Error deleting user profile image:", error.message);
    throw new Error("Failed to delete profile image.");
  }
}

export async function changePassword(data: changePasswordForm) {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  try {
    const response = await sendRequest(
      `${API_BASE}/users/change-password`,
      "PUT",
      data,
      { Authorization: `Bearer ${token}` }
    );

    return response;
  } catch (error: any) {
        throw new Error(error.message || "Network error");

  }
}

export async function deleteUserProfile() {
    const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  try {
    const response = await sendRequest(
      `${API_BASE}/users/me`,
      "DELETE",
      {},
      { Authorization: `Bearer ${token}` }
    );

    return response;
  } catch (error: any) {
        throw new Error(error.message || "Network error");

  }
}