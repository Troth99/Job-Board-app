import { useState } from "react";
import { setAuthenticated } from "../redux/authSlice";
import { store } from "../redux/store";
import { getAuthToken, getRefreshToken, refreshAccessToken, updateTokensInStorage } from "./useAuth";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

// Global refresh promise to prevent multiple simultaneous refresh attempts
let refreshPromise: Promise<any> | null = null;

const useApiRequester = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);


  const request = async (
    url: string,
    method: HttpMethod,
    data?: Record<string, any>,
    headers?: Record<string, string>,
    isRetry: boolean = false,
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    // Read the latest token at call time and include Authorization header
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

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    if (method === "GET" || method === "DELETE") {
      delete options.body;
    }

    try {
      const response = await fetch(url, options);
      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 401 && !isRetry) {
     
          const refreshToken = getRefreshToken();
          
          if (refreshToken) {
            try {
              // Check if refresh is already in progress
              if (!refreshPromise) {
                refreshPromise = refreshAccessToken(refreshToken)
                  .then(tokenData => {
              
                    updateTokensInStorage(tokenData.accessToken, tokenData.refreshToken);
                    return tokenData;
                  })
                  .finally(() => {
                    refreshPromise = null; // Clear the promise
                  });
              } else {
                console.error('Unable to refresh Token.')
              }
              
              // Wait for the refresh to complete
              await refreshPromise;
              
      
              return await request(url, method, data, headers, true);
            } catch (refreshError) {
              // Refresh failed - logout user
              refreshPromise = null;
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

      setData(resData);
      return resData;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, request };
};

export default useApiRequester;
