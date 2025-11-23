import { Job } from "../components/Jobs/CreateJob/CreateJob";
import { sendRequest } from "../utils/requester";
import { API_BASE } from "./api";
import { authHeaders } from "./auth/authHeaders";
import { getAuthToken } from "./auth/authService";

export async function getRecentJobs(limit = 5) {
  try {
    const result = await fetch(`${API_BASE}/jobs/recent?limit=${limit}`);

    if (!result.ok) {
      throw new Error("Failed to fetch recent jobs!");
    }

    const data = await result.json();
    console.log(data);
    return data.jobs;
  } catch (error) {
    console.error("Error fetching recent jobs:", error);
    return [];
  }
}

export async function getAllJobs() {
  return [];
}

export async function createJob(jobData: Partial<Job>) {
  try {
    const token = getAuthToken();

    if (!token) throw new Error("User not authenticated.");

    const response = await sendRequest(
      `${API_BASE}/jobs`,
      "POST",
      jobData,
      authHeaders()
    );
    return response;
  } catch (error: any) {
    console.error("Create job error:", error.message);
    throw error;
  }
}


export async function getJobsByCompany(companyId: string) {
  try {
    if(!companyId) throw new Error('Not part of a company.');
      const response = await sendRequest(`${API_BASE}/jobs?company=${companyId}`, 'GET', {})

      return response
  } catch (error: any)  {
    console.error('Failed to fetch jobs.')
  }
}
