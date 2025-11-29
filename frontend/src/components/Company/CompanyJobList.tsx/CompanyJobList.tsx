import { useEffect, useState } from "react";
import { Job } from "../../Jobs/CreateJob/CreateJob";
import useJobs from "../../../hooks/useJobs";
import { ShowJobs } from "../showJobs/showCompanyJobs";
import Spinner from "../../Spinner/Spinner";

interface CompanyJobsListProps {
  companyId: string;
  canPostJob: boolean;
  onPostJob: () => void;
  setLoadingJobs: (loading: boolean) => void;
}

export function CompanyJobsList({
  companyId,
  canPostJob,
  onPostJob,
  setLoadingJobs,
}: CompanyJobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { getJobsByCompany, loading } = useJobs();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
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
      } finally {
        setLoadingJobs(false);
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
        <ShowJobs jobs={jobs} />
      </div>
    </>
  );
}
