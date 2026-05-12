import { useState } from "react";
import useApiRequester from "../useApiRequester";
import { API_BASE } from "../../services/api";
import { ApplicationFormData } from "../../interfaces/Apllication.model";

export default function useApplications() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const createApplication = async (applicationData: ApplicationFormData) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/applications`,
        "POST",
        applicationData
      );
      return response;
    } catch (error) {
      console.error("Failed to create application");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsByJobId = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/applications/job/${jobId}`,
        "GET",
        {}
      );
      return response;
    } catch (error) {
      console.error("Failed to get applications for current job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (
    applicationsId: string,
    status: string
  ) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/applications/${applicationsId}/status`,
        "PATCH",
        { status }
      );
      return response;
    } catch (error) {
      console.error("Failed to update application status.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (applicationId: string) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/applications/${applicationId}`,
        "DELETE"
      );
      return response;
    } catch (error) {
      console.error("Failed to delete application.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createApplication,
    getApplicationsByJobId,
    updateApplicationStatus,
    deleteApplication,
  };
}
