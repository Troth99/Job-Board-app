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
