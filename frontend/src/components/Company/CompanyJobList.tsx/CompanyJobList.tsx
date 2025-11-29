import { useEffect, useState } from "react";
import { Job } from "../../Jobs/CreateJob/CreateJob";
import useJobs from "../../../hooks/useJobs";
import { ShowJobs } from "../../../showJobs/showJobs";
import Spinner from "../../Spinner/Spinner";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";

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
            <button className="add-button">
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
