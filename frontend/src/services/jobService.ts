import { API_BASE } from "./api";

export  async function getRecentJobs(limit = 5) {

    try {
        const result = await fetch(`${API_BASE}/jobs/recent?limit=${limit}`)
       
        if(!result.ok){
            throw new Error('Failed to fetch recent jobs!')
        }

        const data = await result.json();
        console.log(data)
        return data.jobs;
    } catch (error) {
          console.error("Error fetching recent jobs:", error);
    return [];
    }
}


export  async function getAllJobs() {
    
    return []
}