
import { Job } from '../../Jobs/CreateJob/CreateJob';
import './RecentJobs.css'


interface RecentJobsProps {
  recentJobs: Job[];
}

export default function RecentJobs({ recentJobs }: RecentJobsProps) {
  return (
    <div className="job-container">
      {recentJobs && recentJobs.length > 0 ? (
        <ul className="recent-jobs-container">
          {recentJobs.map((job) => (
            <li key={job.id} className="job-card">
              <div className="job-card-content">
            
                <div className="job-card-image">
                  <img
                    src={job.company ? job.company.logo : 'assets/personAvatr.jpg'}
                    alt={job.company ? job.company.name : 'Default avatar'}
                    className="company-logo"
                  />
                </div>
                <div className="job-card-details">
                  <h3>{job.title}</h3>
             
                  <p>
                    {job.company ? job.company.name : `${job.postedBy.firstName} ${job.postedBy.lastName}`}
                  </p>
                  <p>{job.location} - {job.type}</p>
                  <p>Category: {job.category || "No category"}</p>
                  <p>Posted at: {new Date(job.createdAt).toLocaleDateString()}</p>
           
                  {job.company ? (
                    <p>Company: {job.company.name}</p>
                  ) : (
                    <p>Posted by: {job.postedBy.firstName} {job.postedBy.lastName}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-jobs">No jobs available.</p>
      )}
    </div>
  );
}