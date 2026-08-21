import { useNavigate, useParams } from "react-router";
import "../../styles/variables.css";
import "../../styles/jobActions.css";
import { useEffect, useState } from "react";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { Job } from "../../types/Job.model";
import { CandidateApplications } from "../CandidateApplications/CandidateApplications";
import { Candidate } from "../../types/Apllication.model";
import { Container } from "../../../../shared/components/Container/Container";
import DetailsJobMainSection from "../../views/DetailsJob/DetailsJobMainSection";
import useMembers from "../../../companies/hooks/useMembers";
import { useFavoritesContext } from "../../../../context/FavouritesJobsContext";
import useJobs from "../../hooks/useJobsAPI";
import useApplications from "../../hooks/useJobApplications";

//toReractor

function DetailsJob() {
  const { companyId, jobId } = useParams<{
    companyId: string;
    jobId: string;
  }>();
  const { removeFromFavorites } = useFavoritesContext();

  const navigate = useNavigate();
  const [jobDetails, setJobdetails] = useState<Job>();
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState();
  const [jobStatus, setJobStatus] = useState<boolean | undefined>(
    currentStatus,
  );
  const [statusLoading, setStatusLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [localRole, setLocalRole] = useState<string | null>(null);
  const { getUserRole } = useMembers();
  const { getJobById, updateJob, deleteJob } = useJobs();
  const { getApplicationsByJobId } = useApplications();
  const [loadingApplications, setLoadingApplications] =
    useState<boolean>(false);

  if (!jobId) {
    console.error("Job Id is missing");
    return;
  }

  const fetchCurrentJob = async () => {
    try {
      if (jobId) {
        setLoading(true);
        const currentJob = await getJobById(jobId);
        setCurrentStatus(currentJob.isActive);
        setJobdetails(currentJob);
      }
    } catch (error) {
      console.error("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRole = async () => {
    try {
      if (companyId) {
        const role = await getUserRole(companyId);
        setLocalRole(role);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  const fetchApllications = async () => {
    try {
      setLoadingApplications(true);
      const result = await getApplicationsByJobId(jobId);
      setCandidates(result);
    } catch (error) {
      console.error("Error fetching candidates");
    } finally {
      setLoadingApplications(false);
    }
  };
  useEffect(() => {
    if (companyId) {
      fetchRole();
    }
    if (jobId) {
      fetchCurrentJob();
      fetchApllications();
    }
  }, [companyId, jobStatus, jobId]);

  const editNavigateHandler = () => {
    navigate(`/company/${companyId}/job/${jobId}/edit`);
  };

  const changeStatusHandler = async () => {
    setStatusLoading(true);
    try {
      const newStatus = !jobDetails?.isActive;

      setJobdetails((prevJob) => ({
        ...prevJob,
        isActive: newStatus,
      }));

      const updatedJob: Job = {
        ...jobDetails,
        isActive: newStatus,
        updatedAt: new Date().toISOString(),
      };

      setJobStatus(newStatus);

      const response = await updateJob(jobId, updatedJob);

      if (response) {
        setJobdetails((prevJob) => ({
          ...prevJob,
          isActive: newStatus,
        }));
      }
    } catch (error) {
      console.error("failed to update the status");
    } finally {
      setStatusLoading(false);
    }
  };
  const canEditOrDelete = localRole === "admin" || localRole === "owner";

  const deleteJobHandler = async () => {
    if (confirm("Are you sure you want to delete this job ?")) {
      try {
        setLoading(true);
        if (!jobId) {
          return;
        }
        await deleteJob(jobId);
        await removeFromFavorites(jobId);
        navigate(`/company/${companyId}/dashboard`);
      } catch (error) {
        console.error("Failed to delete job:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Container>
        {loading ? (
          <Spinner overlay={true} />
        ) : statusLoading ? (
          <Spinner overlay={true} />
        ) : (
          <div className="job-details-container">
            <DetailsJobMainSection jobDetails={jobDetails} />

            <CandidateApplications
              jobId={jobId}
              candidates={candidates}
              loading={loadingApplications}
              setCandidates={setCandidates}
            />
            {canEditOrDelete && (
              <div className="job-actions">
                <h3>Job Actions</h3>
                <div className="job-actions-buttons">
                  <button
                    className="edit-job-button"
                    onClick={editNavigateHandler}
                  >
                    Edit Job
                  </button>
                  <button
                    className="delete-job-button"
                    onClick={deleteJobHandler}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete Job"}
                  </button>
                  <button
                    className="app-button app-button--secondary"
                    onClick={changeStatusHandler}
                  >
                    {jobDetails?.isActive ? "Deactivate Job" : "Activate Job"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

export default DetailsJob;
