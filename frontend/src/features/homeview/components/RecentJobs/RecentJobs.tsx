import { Trans } from "@lingui/react/macro";
import { formatDate } from "../../../../shared/utils/formData";
import { Job } from "../../../jobs/types/Job.model";
import "./RecentJobs.css";
import { Link } from "react-router";


interface RecentJobsProps {
  recentJobs: Job[];
}
export default function RecentJobs({ recentJobs }: RecentJobsProps) {
  return (
    <div className="recentjobs-container">
      {recentJobs && recentJobs.length > 0 ? (
        <ul className="recentjobs-list">
          {recentJobs.map((job) => (
            <li key={job._id} className="recentjobs-card">
              <Link to={`/job/${job._id}`} className="recentjobs-link">
                <div className="recentjobs-card-content">
                  <div className="recentjobs-card-image">
                    <img
                      src={job.company?.logo}
                      alt={job.company?.name ? `${job.company.name} logo` : "Company logo"}
                      className="company-logo-recentjobs-home-page"
                    />
                  </div>
                  <div className="recentjobs-card-main">
                    <h3 className="recentjobs-title">{job.title}</h3>
                    <div className="recentjobs-company">{job.company?.name}</div>
                    <div className="recentjobs-card-meta">
                      {job.location && <span>{job.location}</span>}
                      {(typeof job.category === "string" ? job.category : job.category?.name) && (
                        <span>{typeof job.category === "string" ? job.category : job.category?.name}</span>
                      )}
                      {job.workMode && <span>{job.workMode}</span>}
                    </div>
                  </div>
                  <div className="recentjobs-card-side">
                    {job.salary && <span className="recentjobs-salary">{job.salary}</span>}
                    <div className="recentjobs-date"><Trans>Posted {job.createdAt && formatDate(job.createdAt)}</Trans></div>
                    <span className="recentjobs-open"><Trans>View role</Trans></span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="recentjobs-no-jobs"><Trans>No jobs available.</Trans></p>
      )}  

          <div className="recentjobs-view-all-wrapper">
              
            <Link to="/jobs" className="recentjobs-view-all-link">
                <Trans>View All Jobs</Trans>
            </Link>
          </div>
    
    </div>

  );
}
