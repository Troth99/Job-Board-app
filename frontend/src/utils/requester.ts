import { toast } from "react-toastify";
import { setAuthenticated } from "../redux/authSlice";
import { store } from "../redux/store";
import { getAuthToken, getRefreshToken, refreshAccessToken, updateTokensInStorage } from "../services/auth/authService";

// Global flag to prevent auto-refresh during logout
let isLoggingOut = false;

export function setLoggingOut(value: boolean) {
  isLoggingOut = value;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

export async function sendRequest(
  url: string, 
  method: HttpMethod, 
  data?: Record<string, any>, 
  headers?: Record<string, string>,
  isRetry: boolean = false
) {
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
      if (response.status === 401 && !isRetry && !isLoggingOut) {
        // Try to refresh the token
        const refreshToken = getRefreshToken();
        
        if (refreshToken) {
          try {
            const tokenData = await refreshAccessToken(refreshToken);
            
            // Update tokens in localStorage
            updateTokensInStorage(tokenData.accessToken, tokenData.refreshToken);
            
            // Retry the original request with the new token
            return await sendRequest(url, method, data, headers, true);
          } catch (refreshError) {
            // Refresh failed - logout user
            console.error('Token refresh failed:', refreshError);
            localStorage.removeItem("user");
            store.dispatch(setAuthenticated({ isAuthenticated: false }));
            window.location.href = "/";
            throw new Error('Session expired. Please login again.');
          }
        } else {
          // No refresh token - logout
          localStorage.removeItem("user");
          store.dispatch(setAuthenticated({ isAuthenticated: false }));
          window.location.href = "/";
          throw new Error('Session expired. Please login again.');
        }
      }
      throw new Error(resData.message || "Request failed");
    }
    return resData;

  } catch (err: any) {
    throw new Error(err?.message || "Something went wrong");
  }
};
