import "./RecentJobs.css";
import { formatDate } from "../../../utils/formData";
import { Link } from "react-router";
import { Job } from "../../../interfaces/Job.model";

interface RecentJobsProps {
  recentJobs: Job[];
}

//To add button for view all jbos udner the scrolled down section and add more details on the card like posted by and posted date


export default function RecentJobs({ recentJobs }: RecentJobsProps) {
  return (
    <div className="recentjobs-container">
      {recentJobs && recentJobs.length > 0 ? (
        <ul className="recentjobs-list">
          {recentJobs.map((job) => (
            <Link
              to={`/job/${job._id}`}
              key={job._id}
              className="recentjobs-link"
            >
              <li key={job._id} className="recentjobs-card">
                <div className="recentjobs-card-content">
                  <div className="recentjobs-card-image">
                    <img
                      src={
                        job?.company?.logo &&
                        job.company.logo.trim().startsWith("http")
                          ? job.company.logo
                          : "/assets/defaultCompany.png"
                      }
                      alt={
                        job?.company?.logo && job.company.logo.trim() !== ""
                          ? job.company.name
                          : "Default Company Logo"
                      }
                      className="recentjobs-company-logo"
                    />
                  </div>
                  <div className="recentjobs-card-main">
                    <h3 className="recentjobs-title">{job.title}</h3>
                    <div className="recentjobs-company">{job.company?.name}</div>
                    <div className="recentjobs-location">{job.location}</div>
                    <div className="recentjobs-category">{job.category?.name}</div>
                  </div>
                  <div className="recentjobs-card-side">
                    <div className="recentjobs-date">Posted: {job.createdAt && formatDate(job.createdAt)}</div>
                    <div className="recentjobs-posted-by">
                      Posted by: {job.createdBy?.firstName} {job.createdBy?.lastName}
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="recentjobs-no-jobs">No jobs available.</p>
      )}
    </div>
  );
}
