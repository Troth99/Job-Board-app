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
    const apiKey = '844b750f8696c887633d12684dff203e'
    const formData = new FormData();

    formData.append('image', file)

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json()

    if (!data.success) throw new Error("Upload failed");
  console.log(data.data.url)
      return data.data.url; 

}

export async function updateUserProfile(data: { avatar?: string; [key: string]: any }) {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

    return sendRequest(
      `${API_BASE}/users/me`,
      "PUT",
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

}