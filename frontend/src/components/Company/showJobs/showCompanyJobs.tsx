import { useEffect, useState } from "react";
import { getJobsByCompany } from "../../../services/jobService";
import { useParams } from "react-router";
import { Job } from "../../Jobs/CreateJob/CreateJob";

interface ShowCompanyJobsProps {
  jobs: Job[];  
  loading: boolean; 
}



export function ShowJobs({jobs}: ShowCompanyJobsProps) {
    const {companyId} = useParams<{companyId: string}>()
    const [loading, setLoading] = useState(true);
  
    return (
              <div className="job-card-member">
         
                    {jobs.length > 0 ? (
                        <div>
                            <ul>
                                {jobs.map((job, index) => (
                                    <li key={index}>
                                        <h3>Job: {job.title}</h3>
                                        <p>Description: {job.description}</p>
                                        <p>Location: {job.location}</p>
                                           <p>Status: {job.isActive ? "Active" : "Closed"}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No jobs for current company.</p>  
                    )}
            
         
        </div>
    )
}