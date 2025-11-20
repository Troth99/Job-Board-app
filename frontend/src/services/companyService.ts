import { RegisterCompanyInterface } from "../components/Company/RegisterCompany/RegisterCompany";
import { sendRequest } from "../utils/requester";
import { API_BASE } from "./api";
import { getAuthToken } from "./auth/authService";

function authHeaders(): Record<string, string> {
  const token = getAuthToken();

  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export async function createCompany(data: RegisterCompanyInterface) {
  const response = await sendRequest(`${API_BASE}/companies`, "POST", data, authHeaders());
  return response
}

export async function getCompanies() {
  return await sendRequest(`${API_BASE}/companies`, "GET", {}, authHeaders());
}

export async function getCompanyById(id: string) {
  return await sendRequest(`${API_BASE}/companies/${id}`, "GET", {}, authHeaders());
}

export async function getMyCompany() {
  return await sendRequest(`${API_BASE}/companies/my-company`, "GET", {}, authHeaders());
}