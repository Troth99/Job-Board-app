import { useState, useEffect } from "react";
import { API_BASE } from "../services/api";
import useApiRequester from "./useApiRequester";

interface RegisterCompanyInterface {
  name: string;
  industry: string;
  location: string;
  description: string;
}

export interface Company {
  _id: string;
  name: string;
  industry: string;
  location: string;
  logo: string,
  members?: string[];
  description: string;
  size: string
  website: string;
  createdAt: string
}

export default function useCompany() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const {request} = useApiRequester()

  const createCompany = async (data: RegisterCompanyInterface) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`${API_BASE}/companies`, "POST", data);
      return response;
    } catch (err) {
      setError("Error creating company");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(`${API_BASE}/companies`, "GET", {});
      setCompanies(response);
    } catch (err) {
      setError("Error fetching companies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(
        `${API_BASE}/companies/${id}`,
        "GET",
        {}
      );
      setCompany(response);
    } catch (err) {
      setError("Error fetching company data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMyCompany = async (): Promise<Company | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(
        `${API_BASE}/companies/my-company`,
        "GET",
        {}
      );
      setCompany(response);
      return response;
    } catch (err) {
      setError("Error fetching my company data");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = async (companyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/members`,
        "GET",
        {}
      );
  
      setUserRole(response[0]?.role || null);
    } catch (err) {
      setError("Error fetching user role");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyFromLocalStorage = (): string | null => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const companyId = parsedUser?.company;
      if (companyId) {
        return companyId;
      }
    }
    return null;
  };

const addMemberToCompany = async (companyId: string, userId: string, role: string = "viewer") => {
  try {
    setLoading(true);
    const response = await request(
      `${API_BASE}/companies/${companyId}/members`,
      "POST",
      { userId, role }
    );
    return response;
  } catch (error) {
    console.error('Fialed to add member to the company')
  } finally {
    setLoading(false);
  }
}
  return {
    loading,
    error,
    company,
    companies,
    userRole,
    createCompany,
    getCompanies,
    getCompanyById,
    getUserRole,
    getCompanyFromLocalStorage,
    getMyCompany,
    addMemberToCompany
  };
}
