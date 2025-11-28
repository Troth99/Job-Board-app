import { useState } from "react";
import { toast } from "react-toastify";
import { setAuthenticated } from "../redux/authSlice";
import { RootState, store } from "../redux/store";
import { useSelector } from "react-redux";
import { getAuthToken, getRefreshToken } from "../services/auth/authService";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

const useApiRequester = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);


  const request = async (
    url: string,
    method: HttpMethod,
    data?: Record<string, any>,
    headers?: Record<string, string>
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
        if (response.status === 401) {
          localStorage.removeItem("user");
          store.dispatch(
            setAuthenticated({ isAuthenticated: false, })
          );
          window.location.href = "/"
        }
        throw new Error(resData.message || "Request failed");
      }

      setData(resData);
      return resData;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      toast.error(err?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, request };
};

export default useApiRequester;
