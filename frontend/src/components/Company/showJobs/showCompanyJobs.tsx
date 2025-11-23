import { useEffect, useState } from "react";
import { getJobsByCompany } from "../../../services/jobService";
import { useParams } from "react-router";
import { Job } from "../../Jobs/CreateJob/CreateJob";



export function ShowJobs() {
    const {companyId} = useParams<{companyId: string}>()
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        if(companyId){
            const fetchComapnyJobs = async() => {
                try {
                    const response = await getJobsByCompany(companyId)
                   if(response.length > 0) {
                    setJobs(response);
             
               
                   }else {
                    setJobs([]);
                   }
                } catch (error) {
                     console.error("Error fetching jobs:", error);
                }finally {
                    setLoading(false);
                }
            }
            fetchComapnyJobs()
        }


    }, [companyId])


    return (
              <div className="job-card-member">
                <>
                    {jobs.length > 0 ? (
                        <div>
                            <ul>
                                {jobs.map((job, index) => (
                                    <li key={index}>
                                        <h3>Job: {job.title}</h3>
                                        <p>Description: {job.description}</p>
                                        <p>Location: {job.location}</p>
                                           <p>Status: {job.isActive ? "Active" : "Closed"}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No jobs for current company.</p>  
                    )}
                </>
         
        </div>
    )
}