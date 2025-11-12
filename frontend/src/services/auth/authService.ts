import { API_BASE } from "../api";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  location: string;
    confirmPassword: string;
}

export interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword? : string,
  phoneNumber?: string;
  location?: string;
}


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

export async function registerUser(data: RegisterData): Promise<{ token: string }> {

  console.log('register test')
  const response = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await response.json(); 

  if (!response.ok) {
     throw resData;
  }

  return resData;
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}
