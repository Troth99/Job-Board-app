import { RegisterCompanyInterface } from "../components/Company/RegisterCompany/RegisterCompany";
import { sendRequest } from "../utils/requester";
import { API_BASE } from "./api";
import { authHeaders } from "./auth/authHeaders";



export async function createCompany(data: RegisterCompanyInterface) {
  const response = await sendRequest(
    `${API_BASE}/companies`,
    "POST",
    data,
    authHeaders()
  );
  return response;
}

export async function getCompanies() {
  return await sendRequest(`${API_BASE}/companies`, "GET", {}, authHeaders());
}

export async function getCompanyById(id: string) {
  return await sendRequest(
    `${API_BASE}/companies/${id}`,
    "GET",
    {},
    authHeaders()
  );
}

export async function getMyCompany() {
  return await sendRequest(
    `${API_BASE}/companies/my-company`,
    "GET",
    {},
    authHeaders()
  );
}

export async function getUserRole(companyId: string) {
  return await sendRequest(
    `${API_BASE}/companies/${companyId}/members`,
    "GET",
    {},
    authHeaders()
  );
}

export function getCompanyFromLocalStorage() {
  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed.company || null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
}
