
import { useEffect, useState } from 'react';
import { Job } from '../../Jobs/CreateJob/CreateJob';
import './RecentJobs.css'



interface RecentJobsProps {
  recentJobs: Job[];
}

export default function RecentJobs({ recentJobs }: RecentJobsProps) {
console.log(recentJobs)
  return (
    <div className="job-container">
      {recentJobs && recentJobs.length > 0 ? (
        <ul className="recent-jobs-container">

          {recentJobs.map((job) => (
            <li key={job._id} className="job-card">
              <div className="job-card-content">
            
                <div className="job-card-image">
                  <img
                    src={job.company ? job.company.logo : '/assets/defaultCompany.png'}
                    alt="No image"
                    className="company-logo"
                  />
                </div>
                <div className="job-card-details">
                  <h3>{job.title}</h3>
             
                  <p>
                    {job.company ? job.company.name : `${job.createdBy?.firstName} ${job.createdBy?.lastName}`}
                  </p>
                  <p>{job.location} </p>
                  <p>Category: {job.category?.name}</p>
                  <p>Posted at: {job.createdAt}</p>
           
                  {job.company ? (
                    <p>Company: {job.company.name}</p>
                  ) : (
                    <p>Posted by: {job.createdBy?.firstName} {job.createdBy?.lastName}</p>
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