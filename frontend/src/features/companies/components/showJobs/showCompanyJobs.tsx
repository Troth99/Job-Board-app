import { useNavigate, useParams } from "react-router";
import { formatDate } from "../../../../shared/utils/formData";
import { Job } from "../../../jobs/types/Job.model";
import "./showCompanyJobs.css";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";

interface ShowCompanyJobsProps {
  jobs: Job[];
  isReadOnly?: boolean | undefined;
  onJobClick?: (jobId: string) => void;
  variant?: "default" | "search";
}

export function ShowJobs({ jobs, onJobClick, variant = "default" }: ShowCompanyJobsProps) {
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
    <div className={`job-list ${variant === "search" ? "job-list--search" : ""}`}>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            className={`job-card-member ${variant === "search" ? "job-card-member--search" : ""}`}
            key={job._id}
          >
            <div className="job-card-member__header">
              <div>
                <span className="job-card-member__eyebrow"><Trans>Open opportunity</Trans></span>
                <h3>{job.title}</h3>
                {job.company?.name && (
                  <p className="job-card-member__company">{job.company.name}</p>
                )}
              </div>
              <span className={`job-status-badge ${job.isActive ? "is-active" : "is-closed"}`}>
                {job.isActive ? t`Active` : t`Closed`}
              </span>
            </div>
            <p className="job-card-member__description">{job.description}</p>
            <div className="job-card-member__meta">
              <span><strong><Trans>Location</Trans></strong>{job.location}</span>
              <span><strong><Trans>Work Type</Trans></strong>{job.employmentType}</span>
              <span><strong><Trans>Posted</Trans></strong>{formatDate(job.createdAt || "", "en-US")}</span>
            </div>
            <button
              className="job-card-member__action"
              type="button"
              onClick={() => handleJobClick(job._id)}
            >
              <Trans>View details</Trans> <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        ))
      ) : (
        <p><Trans>No jobs for current company.</Trans></p>
      )}
    </div>
  );
}
