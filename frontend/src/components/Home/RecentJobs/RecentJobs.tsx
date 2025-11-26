
import { useEffect, useState } from 'react';
import { Job } from '../../Jobs/CreateJob/CreateJob';
import './RecentJobs.css'
import { formatDate } from '../../../utils/formData';
import { Link } from 'react-router';



interface RecentJobsProps {
  recentJobs: Job[];
}

export default function RecentJobs({ recentJobs }: RecentJobsProps) {

  return (
    <div className="job-container">
      {recentJobs && recentJobs.length > 0 ? (
        <ul className="recent-jobs-container">
          {recentJobs.map((job) => (
           <Link to={`/job/${job._id}`} key={job._id} className="job-link">
            <li key={job._id} className="job-card">
              <div className="job-card-content">
                <div className="job-card-image">
                  <img
                    src={job.company ? job.company.logo : "/assets/defaultCompany.png"}
                    alt={job.company ? job.company.name : "No image"}
                    className="company-logo"
                  />
                </div>
                <div className="job-card-details">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company?.name}</p>
                  <p className="job-location">{job.location}</p>
                  <p className="job-category">Category: {job.category?.name}</p>
              <p className="job-date">Posted at: {job.createdAt && formatDate(job.createdAt)}</p>
                  <p className="job-company-name">Company: {job.company?.name}</p>
                  <p className="job-posted-by">
                    <strong>Posted by:</strong> {job.createdBy?.firstName} {job.createdBy?.lastName}
                  </p>
                </div>
              </div>
            </li>
        </Link>
          ))}
        </ul>
      ) : (
        <p className="no-jobs">No jobs available.</p>
      )}
    </div>
  );

}