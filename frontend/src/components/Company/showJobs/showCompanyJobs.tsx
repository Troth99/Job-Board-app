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
         <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            className="job-card-member"
            key={job._id}
            onClick={() => handleJobClick(job._id)}
            style={{ cursor: "pointer", marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }} 
          >
            <h3>{job.title}</h3>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Status:</strong> {job.isActive ? "Active" : "Closed"}</p>
       
          </div>
        ))
      ) : (
        <p>No jobs for current company.</p>
      )}
    </div>
  );
    
}