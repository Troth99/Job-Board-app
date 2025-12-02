import { useEffect, useState } from "react";
import useJobs from "../../../hooks/useJobs";
import { ShowJobs } from "../../../showJobs/showJobs";
import Spinner from "../../Spinner/Spinner";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";
import { Job } from "../../../interfaces/Job.model";
import { useNavigate } from "react-router";

interface CompanyJobsListProps {
  companyId: string;
  canPostJob: boolean;
  onPostJob: () => void;
}

export function CompanyJobsList({
  companyId,
  canPostJob,
  onPostJob,
}: CompanyJobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getJobsByCompany } = useJobs();
  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getJobsByCompany(companyId);
        if (response.length > 0) {
          const sortedJobs = response.sort((a: Job, b: Job) => {
            const aCreatedAt = a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;
            const bCreatedAt = b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;
            return bCreatedAt - aCreatedAt;
          });

          setJobs(sortedJobs.slice(0, 5));
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to load jobs");
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, [companyId]);

const viewAllJobsHandler = () =>{
  navigate(`/company/${companyId}/jobs`);
}
  
  return (
    <>
      <div className="content-header">
        <h3>Most 5 recent Posted jobs</h3>
        <div className="buttons-for-jobs">
          {canPostJob && (
            <button className="add-button" onClick={onPostJob}>
              + Post Job
            </button>
          )}
          {canPostJob && (
            <button className="add-button" onClick={viewAllJobsHandler} >
              + View all jobs for the company
            </button>
          )}
        </div>
      </div>

      <div className="job-list">
        {loading ? (
          <LoadingIndicator size="small" message="Loading jobs..." />
        ) : (
          <ShowJobs jobs={jobs} />
        )}
      </div>
    </>
  );
}
