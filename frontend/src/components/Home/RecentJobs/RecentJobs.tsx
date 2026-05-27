import "./RecentJobs.css";
import { formatDate } from "../../../utils/formData";
import { Link } from "react-router";
import { Job } from "../../../interfaces/Job.model";

interface RecentJobsProps {
  recentJobs: Job[];
}


//to fix a bug with company logo not showing in recent jobs section, added a check to see if the logo is a valid url, if not show default logo and alt text accordingly. Also added a view all jobs link at the bottom of the recent jobs section.

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
                      src={job.company?.logo}
                      alt={job.company?.name ? `${job.company.name} logo` : "/default-logo.png"}
                      className="company-logo-recentjobs-home-page"
                    />
                  </div>
                  <div className="recentjobs-card-main">
                    <h3 className="recentjobs-title">{job.title}</h3>
                    <div className="recentjobs-company">{job.company?.name}</div>
                    <div className="recentjobs-location">{job.location}</div>
                    <div className="recentjobs-category">
                      {typeof job.category === "string"
                        ? job.category
                        : job.category?.name}
                    </div>
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

          <div className="recentjobs-view-all-wrapper">
              
            <Link to="/jobs" className="recentjobs-view-all-link">
              View All Jobs
            </Link>
          </div>
    
    </div>

  );
}
