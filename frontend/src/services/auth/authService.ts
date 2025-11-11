import { API_BASE } from "../api";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });


    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.message || "Login failed");
    }


    const data = await response.json();


    return data;
  } catch (err: any) {

    if (err.message) {
      throw new Error(err.message);
    } else {
 
      throw new Error("Login failed");
    }
  }
};

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}
