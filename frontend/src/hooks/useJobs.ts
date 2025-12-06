import { useState } from "react";
import useApiRequester from "./useApiRequester";
import { API_BASE } from "../services/api";
import { Job } from "../interfaces/Job.model";
import { ApplicationFormData } from "../interfaces/Apllication.model";

export default function useJobs() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const getRecentJobs = async (limit = 5) => {
    setLoading(true);
    try {
      const recentJobs = await request(
        `${API_BASE}/jobs/recent?limit=${limit}`,
        "GET"
      );
      return recentJobs.jobs;
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Partial<Job>) => {
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/jobs`, "POST", jobData);
      return response;
    } catch (error: any) {
      console.error("Create job error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getJobsByCompany = async (companyId: string) => {
    setLoading(true);
    try {
      if (!companyId) throw new Error("Not part of a company.");
      const response = await request(
        `${API_BASE}/jobs?company=${companyId}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch jobs.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (jobId: string) => {
    setLoading(true);
    try {
      if (!jobId) throw new Error("Job ID is missing.");
      const response = await request(`${API_BASE}/jobs/${jobId}`, "GET");
      return response;
    } catch (error) {
      console.error("Failed to fetch job.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: Partial<Job>) => {
    setLoading(true);
    try {
      if (!jobId) throw new Error("Job ID is missing.");
      const response = await request(
        `${API_BASE}/jobs/${jobId}`,
        "PUT",
        jobData
      );
      return response;
    } catch (error) {
      console.error("Failed to update job.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getJobsByCategoryName = async (categoryName: string) => {
    setLoading(true);
    try {
      if (!categoryName) throw new Error("Category name is missing!");
      const response = await request(
        `${API_BASE}/jobs/category/${categoryName}`,
        "GET",
        {}
      );
      return response;
    } catch (error) {
      console.error("Failed to load current category jobs.");
    } finally {
      setLoading(false);
    }
  };

  const getAllJobs = async () => {
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/jobs`, "GET", {});
      return response;
    } catch (error) {
      console.error("Failed to load all jobs.");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/jobs/${jobId}`, "DELETE", {});
      return response;
    } catch (error) {
      console.error("Failed to delete job.");
    }finally {
      setLoading(false)
    }
  };


  const createApplication = async (applicationData: ApplicationFormData) => {
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/applications`, "POST", applicationData);
      return response
    } catch (error) {
      console.error('Failed to create application')
    }
    finally{
      setLoading(false)
    }
  };
  
  const getApplicationsByJobId = async (jobId: string) => {
    setLoading(true)
    try {
      const response = await request(`${API_BASE}/applications/job/${jobId}`, 'GET', {})
      return response
    } catch (error) {
      console.error('Failed to get applicatiosn for currentJob')
    }finally {
      setLoading(false)
    }
  };

  const updateApplicationStatus = async (applicationsId: string, status: string) => {
    setLoading(true);
    try {
      const response = await request(`${API_BASE}/applications/${applicationsId}/status`, "PATCH", {status})
      return response
    } catch (error) {
       console.error("Failed to update application status.");
    }finally {
      setLoading(false)
    }
  }
  const deleteApplication = async (applicationId: string) => {
  setLoading(true);
  try {
    const response = await request(`${API_BASE}/applications/${applicationId}`, "DELETE");
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
    getRecentJobs,
    createJob,
    getJobsByCompany,
    getJobById,
    updateJob,
    getJobsByCategoryName,
    getAllJobs,
    deleteJob,
    createApplication,
    getApplicationsByJobId,
    updateApplicationStatus,
    deleteApplication
  };
}
