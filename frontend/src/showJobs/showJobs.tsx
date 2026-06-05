import { useNavigate, useParams } from "react-router";
import { formatDate } from "../utils/formData";
import { Job } from "../interfaces/Job.model";
import "./showJobs.css";

interface ShowCompanyJobsProps {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
  isReadOnly?: boolean;
}

export function ShowJobs({
  jobs,
  onJobClick,
  isReadOnly = false,
}: ShowCompanyJobsProps) {
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
            className={`job-card-member ${isReadOnly ? "is-readonly" : "is-clickable"}`}
            key={job._id}
            onClick={isReadOnly ? undefined : () => handleJobClick(job._id)}
          >
            <div className="job-card-header">
              <h3 className="job-title">{job.title}</h3>
              <span
                className={`job-status-badge ${job.isActive ? "is-active" : "is-closed"}`}
              >
                {job.isActive ? "Active" : "Closed"}
              </span>
            </div>

            <p className="job-description">
              <span className="job-field-label">Description:</span> {job.description}
            </p>

            <div className="job-meta-grid">
              <p className="job-meta-item">
                <span className="job-field-label">Location:</span> {job.location}
              </p>
              <p className="job-meta-item">
                <span className="job-field-label">Work type:</span> {job.employmentType}
              </p>
              <p className="job-meta-item">
                <span className="job-field-label">Salary:</span> {job.salary}
              </p>
              <p className="job-meta-item">
                <span className="job-field-label">Posted At:</span>{" "}
                {formatDate(job.createdAt || "", "en-US")}
              </p>
            </div>
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
