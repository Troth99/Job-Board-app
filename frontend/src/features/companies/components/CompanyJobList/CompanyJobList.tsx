import { useEffect, useState } from "react";
import useJobs from "../../../jobs/hooks/useJobsAPI";
import { ShowJobs } from "../showJobs/showCompanyJobs";
import { LoadingIndicator } from "../../../../shared/components/LoadingIndicator/LoadingIndicator";
import { Job } from "../../../jobs/types/Job.model";
import { useNavigate } from "react-router";
import { Trans, useLingui } from "@lingui/react/macro";

interface CompanyJobsListProps {
  companyId: string;
  canPostJob: boolean;
  onPostJob: () => void;
  isReadOnly?: boolean | undefined;
}


export function CompanyJobsList({
  companyId,
  canPostJob,
  onPostJob,
  isReadOnly,
}: CompanyJobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getRecentJobsByCompany } = useJobs();
  const navigate = useNavigate();
  const {t} = useLingui();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companyJobs = await getRecentJobsByCompany(companyId, 5);
        setJobs(companyJobs);
        console.log("Fetched company jobs:", companyJobs);
      } catch (error) {
        console.error("Failed to load jobs");
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [companyId]);

const viewAllJobsHandler = () =>{
  navigate(`/company/${companyId}/jobs`);
}
  
  return (
    <>
      <div className="content-header-jobs">
        <h3><Trans>Most 5 recent Posted jobs</Trans></h3>
        <div className="buttons-for-jobs">
          {canPostJob && (
            <button className="add-button" onClick={onPostJob}>
            <Trans>+ Post Job</Trans>
            </button>
          )}
          {canPostJob && (
            <button className="add-button" onClick={viewAllJobsHandler} >
              <Trans>+ View all jobs for the company</Trans>
            </button>
          )}
        </div>
      </div>

      <div className="job-list">
        {loading ? (
          <LoadingIndicator size="small" message={t`Loading jobs...`} />
        ) : (
          <ShowJobs jobs={jobs} isReadOnly={isReadOnly} />
        )}
      </div>
    </>
  );
}
