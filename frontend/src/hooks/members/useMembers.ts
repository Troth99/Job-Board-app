import { useState } from "react";
import { API_BASE } from "../../services/api";
import useApiRequester from "../common/useApiRequester";
import { getUserFromLocalStorage } from "../common/useAuth";

export default function useMembers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { request } = useApiRequester();

  const getUserRole = async (companyId: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/members`,
        "GET",
        {}
      );
      const user = getUserFromLocalStorage();
      const userId = user._id;
      const member = response.find((m: any) => m.userId?._id === userId);
      const role = member?.role || null;
      return role;
    } catch (err) {
      setError("Error fetching user role");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addMemberToCompany = async (companyId: string, userId: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/add-member`,
        "POST",
        { userId }
      );
      return { success: true, ...response };
    } catch (error: any) {
      return {
        success: false,
        errorMessage: error?.message || "Failed to add member to the company",
      };
    } finally {
      setLoading(false);
    }
  };

  const getCompanyMembers = async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/members`,
        "GET",
        {}
      );
      return response;
    } catch (err) {
      setError("Error fetching company members");
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const changeMemberRole = async (
    companyId: string,
    memberId: string,
    role: string
  ) => {
    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/members/${memberId}/role`,
        "PATCH",
        { role }
      );
      return response;
    } catch (error) {
      setError("Error occured while changing the role.");
      console.error(error);
    }
  };

  const kickMemberFromCompany = async (companyId: string, memberId: string) => {
    try {
      const response = await request(
        `${API_BASE}/companies/${companyId}/member/${memberId}`,
        "DELETE",
        {}
      );
      return response;
    } catch (error) {
      setError("Error occured while kicking the member.");
      console.error(error);
    }
  };

  return {
    loading,
    error,
    getUserRole,
    addMemberToCompany,
    getCompanyMembers,
    changeMemberRole,
    kickMemberFromCompany,
  };
}
