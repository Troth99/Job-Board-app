import { toast } from "react-toastify";
import { setAuthenticated } from "../redux/authSlice";
import { store } from "../redux/store";
import { useNavigate } from "react-router";
import { getAuthToken } from "../services/auth/authService";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

export async function sendRequest(url: string, method: HttpMethod, data?: Record<string, any>, headers?: Record<string, string>) {
  const currentToken = getAuthToken();
  const authHeaders: Record<string, string> = currentToken
    ? { Authorization: `Bearer ${currentToken}` }
    : {};

  const options: RequestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...headers,
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  if (method === 'GET' || method === 'DELETE') {
    delete options.body;
  }

  try {
    const response = await fetch(url, options);
    const resData = await response.json();

    if (!response.ok) {
       if (response.status === 401) {
        // Optionally handle unauthorized globally here
      }
      throw new Error(resData.message || "Request failed");
    }
    return resData;

  } catch (err: any) {
    throw new Error(err?.message || "Something went wrong");
  }
};
