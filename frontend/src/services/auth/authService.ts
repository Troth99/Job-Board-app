import { sendRequest, setLoggingOut } from "../../utils/requester";
import { API_BASE } from "../api";


export interface registerFormType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword : string,
  phoneNumber: string;
  location: string;
}


export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    
    const response = await sendRequest( `${API_BASE}/users/login`, "POST", {email, password})
    return response

  } catch (err: any) {
    if (err.message) {
      throw new Error(err.message);
    } else {
      throw new Error("Login failed");
    }
  }
};

export async function registerUser(data: registerFormType) {
  
try {
  const { confirmPassword, ...registrationData } = data;
  const response = await sendRequest( `${API_BASE}/users/register`, "POST", registrationData)
  return response
  
} catch (error: any) {
  console.error('Registration error:', error);
  throw error;
}
}

export async function logOut(){
  // Prevent auto-refresh during logout
  setLoggingOut(true);
  
  try {
    const token = getRefreshToken();

    if (!token) {

      localStorage.removeItem('user');
      return true;
    }
    
    const response = await sendRequest(`${API_BASE}/users/logout`, "POST", {refreshToken: token})

    if(response){
      localStorage.removeItem('user');
      return true
    }
  } catch (error) {
    console.error('Logout error', error)
    
    localStorage.removeItem('user');
    return true; 
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${API_BASE}/users/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
}

export function updateTokensInStorage(accessToken: string, refreshToken?: string) {
  const user = getUserFromLocalStorage();
  const updatedUser = {
    ...user,
    accessToken,
    ...(refreshToken && { refreshToken }),
  };
  localStorage.setItem('user', JSON.stringify(updatedUser));
}

export function getAuthToken(): string | null {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.accessToken
}

export function getRefreshToken(): string | null {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.refreshToken
}

export function getUserFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user
}
