import { useState } from "react"
import { Category } from "../../../services/categoryService";

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  createdBy: string;
  company?: string | null; 
  type: string;
  category?: string; 
  createdAt: string;
}

interface RecentJobsProps {
  recentJobs: Job[];
}

export default function RecentJobs({recentJobs} : RecentJobsProps) {
const [jobs, setJob] = useState<Job[]>([])

    return (
       <ul>
      {jobs.map((job) => (
        <li key={job._id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.company || "Unknown company"}</p>
          <p>{job.location} - {job.type}</p>
          <p>{job.salary}</p>
        </li>
      ))}
    </ul>
    )
}