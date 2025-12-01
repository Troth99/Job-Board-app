import { useEffect, useState } from "react";
import { ShowJobs } from "../../../showJobs/showJobs";
import { Job } from "../CreateJob/CreateJob";
import useJobs from "../../../hooks/useJobs";
import Spinner from "../../Spinner/Spinner";
import "./ViewAllJobs.css"

export function ViewAllJobs() {
const [jobs, setJobs] = useState<Job[]>([])
const {loading, getAllJobs } = useJobs()

useEffect(() => {
    const fetchJobs = async () => {
        try {
            const response = await getAllJobs();
            console.log(response)
            setJobs(response)
        } catch (error) {
            console.error('Failed to set jobs.')
        }

    }
    fetchJobs()
},[])

if(loading){
    return <Spinner overlay={true} />
}
    return (
<div className="jobs-list-modern">
  {jobs.length > 0 ? (
    jobs.map((job) => (
      <div className="job-card-modern" key={job._id}>
        <div className="job-header-modern">
          <span className="job-company-modern">{typeof job.company === "string" ? job.company : job.company?.name ?? ""}</span>
          <span className="job-location-modern">{job.location}</span>
        </div>
        <h2 className="job-title-modern">{job.title}</h2>
        <div className="job-info-modern">
          <span className="job-type-modern">{job.employmentType}</span>
          <span className="job-salary-modern">{job.salary}</span>
            <span className="job-salary-modern">{job.views}</span>
          <span className="job-status-modern">{job.isActive ? "Active" : "Closed"}</span>
        </div>
        <span className="job-apply-btn-modern">Posted by: {job.createdBy?.firstName} {job.createdBy?.lastName}</span>
      </div>
    ))
  ) : (
    <p className="no-jobs-modern">No jobs found.</p>
  )}
</div>
    )
}