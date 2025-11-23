import { useEffect, useState } from "react";
import { getJobsByCompany } from "../../../services/jobService";
import { useNavigate, useParams } from "react-router";
import { Job } from "../../Jobs/CreateJob/CreateJob";

interface ShowCompanyJobsProps {
  jobs: Job[];  
}



export function ShowJobs({jobs}: ShowCompanyJobsProps) {
   const { companyId } = useParams<{ companyId: string, jobId: string }>();
    console.log(jobs)
console.log(companyId);
    const navigate = useNavigate()
  
      const handleJobClick = (jobId: string) => {
    navigate(`/company/${companyId}/job/${jobId}`); 
  };
    return (
              <div className="job-card-member">
                    {jobs.length > 0 ? (
                        <div>
                            <ul>
                                {jobs.map((job) => (
                                    <li key={job._id}
                                    onClick={() => handleJobClick(job._id)}
                                    style={{cursor: 'pointer'}}
                                    >
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