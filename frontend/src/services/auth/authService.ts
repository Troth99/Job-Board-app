import { sendRequest } from "../../utils/requester";
import { API_BASE } from "../api";


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

export async function registerUser(formData: FormData) {
  const data = Object.fromEntries(formData) as Record<string, string>;
  
   const response = await sendRequest( `${API_BASE}/users/register`, "POST", data)
    return response
}

export async function logOut(){
try {
  
  const token = getAuthToken();

     if (!token) {
      throw new Error('No token found!');
    }
  const response = await sendRequest(`${API_BASE}/users/logout`, "POST" , {})

  if(response){
    localStorage.removeItem('user');
    return true
  }
} catch (error) {
  console.error('Logout error', error)
  return false
}
}
export function getAuthToken(): string | null {
  return localStorage.getItem("user");
}
