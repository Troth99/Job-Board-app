import { useEffect, useState } from "react";
import useJobs from "../hooks/useJobs";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../utils/formData";
import { Job } from "../interfaces/Job.model";

interface ShowCompanyJobsProps {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
}

export function ShowJobs({ jobs, onJobClick }: ShowCompanyJobsProps) {
  const { companyId } = useParams<{ companyId: string; jobId: string }>();
  const navigate = useNavigate();

  const handleJobClick = (jobId: string | undefined) => {
    if (!jobId) {
      console.error("Job id is missing");
      return;
    }
    if (onJobClick) {
      onJobClick(jobId);
    } else {
      navigate(`/company/${companyId}/job/${jobId}/details`);
    }
  };
  return (
    <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            className="job-card-member"
            key={job._id}
            onClick={() => handleJobClick(job._id)}
            style={{
              cursor: "pointer",
              marginBottom: "20px",
              border: "1px solid #ccc",
            }}
          >
            <h3>{job.title}</h3>
            <p>
              <strong>Description:</strong> {job.description}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Work type:</strong> {job.employmentType}
            </p>
            <p>
              <strong>Salary:</strong> {job.salary}
            </p>
            <p>
              <strong>Posted At:</strong>{" "}
              {formatDate(job.createdAt || "", "en-US")}
            </p>
            <p>
              <strong>Status:</strong> {job.isActive ? "Active" : "Closed"}
            </p>
          </div>
        ))
      ) : (
           <div className="no-jobs-message">
              <i className="fa-solid fa-briefcase"></i>
              <h3>No jobs found</h3>
            </div>
      )}
    </div>
  );
}
