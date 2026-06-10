import { useState } from "react";
import useApiRequester from "../shared/useApiRequester";
import { API_BASE } from "../../services/api";
import { Job } from "../../interfaces/Job.model";

export default function useJobs() {
  const { request } = useApiRequester();
  const [loading, setLoading] = useState<boolean>(false);

  const getRecentJobs = async (limit = 5) => {
    setLoading(true);
    try {
      const recentJobs = await request(
        `${API_BASE}/jobs/recent?limit=${limit}`,
        "GET",
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
        "GET",
      );

      //returning array of jobs so the components using array methods can work without issues. If response is not an array, it checks if response.jobs is an array and returns it. Otherwise, it returns an empty array.
      return Array.isArray(response)
        ? response
        : Array.isArray(response?.jobs)
          ? response.jobs
          : [];
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
        jobData,
      );
      return response;
    } catch (error) {
      console.error("Failed to update job.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getJobsByCategoryName = async (
    categoryName: string,
    page: number,
    limit: number,
  ) => {
    setLoading(true);
    try {
      if (!categoryName) throw new Error("Category name is missing!");
      const response = await request(
        `${API_BASE}/jobs/category/${categoryName}?page=${page}&limit=${limit}`,
        "GET",
        {},
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

  const getRecentJobsByCompany = async (companyId: string, limit?: number) => {
    setLoading(true);
    try {
      if (!companyId) throw new Error("Company ID is missing.");

      const response = await request(
        `${API_BASE}/jobs/recent-company-jobs/${companyId}?limit=${limit}`,
        "GET",
      );

      return response.recentJobs;
    } catch (error) {
      console.error("Failed to load recent jobs for the company.");
    } finally {
      setLoading(false);
    }
  };

  const getJobsPage = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await request(
        `${API_BASE}/jobs?page=${page}&limit=${limit}`,
        "GET",
        {},
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch jobs page.");
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
    } finally {
      setLoading(false);
    }
  };

  const getCalendarEventsForJobs = async (
    companyId: string,
    startDate: string,
    endDate: string,
  ) => {
    setLoading(true);
    try {

      if(!companyId) {
        throw new Error("Company ID is missing.");
      }
      const response = await request(
        `${API_BASE}/jobs/calendar-events/${companyId}?startDate=${startDate}&endDate=${endDate}`,
        "GET",
        {},
      );
      return response.events ?? [];
    }catch (error) {
      console.error("Failed to fetch calendar events for jobs.");
      return [];
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
    getJobsPage,
    getRecentJobsByCompany,
    getCalendarEventsForJobs
  };
}
