import { getAuthToken } from "./authService";

export function authHeaders(): Record<string, string> {
  const token = getAuthToken();

  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}