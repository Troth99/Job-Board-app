import { useNavigate, useParams } from "react-router";
import "./Details.css";
import { useEffect, useState } from "react";
import useJobs from "../../../hooks/useJobs";
import Spinner from "../../Spinner/Spinner";
import { formatDate } from "../../../utils/formData";
import useCompany from "../../../hooks/useCompany";
import { Job } from "../../../interfaces/Job.model";
import { CandidateApplications } from "../CandidateApplications/CandidateApplications";
import { Candidate } from "../../../interfaces/Apllication.model";

function DetailsJob() {
  const { companyId, jobId } = useParams<{
    companyId: string;
    jobId: string;
  }>();
  const navigate = useNavigate();
  const [jobDetails, setJobdetails] = useState<Job>();
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState();
  const [jobStatus, setJobStatus] = useState<boolean | undefined>(
    currentStatus
  );
  const [statusLoading, setStatusLoading] = useState(false);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const { getUserRole, userRole } = useCompany();
    const { getJobById, updateJob, deleteJob, getApplicationsByJobId } = useJobs();
    const [loadingApplications, setLoadingApplications] = useState<boolean>(false);
  
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
        await getUserRole(companyId);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApllications = async() => {
    try {
        setLoadingApplications(true);
      const result = await getApplicationsByJobId(jobId)
      setCandidates(result)
    } catch (error) {
      console.error('Error fetching candidates')
    }finally{
        setLoadingApplications(false);
    }
  }
  useEffect(() => {
    if (companyId) {
      fetchRole();
    }
    if (jobId) {
      fetchCurrentJob();
      fetchApllications()
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
  const canEditOrDelete = userRole === "admin" || userRole === "owner";

  const deleteJobHandler = async () => {
    if (confirm("Are you sure you want to delete this job ?")) {
      try {
        setLoading(true);
        if (!jobId) {
          return;
        }
        await deleteJob(jobId);
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
      {loading ? (
        <Spinner overlay={true} />
      ) : statusLoading ? (
        <Spinner overlay={true} />
      ) : (
        <div className="job-details-container">
          <div className="job-overview">
            <div className="job-title">
              <h3>Job Title: {jobDetails?.title}</h3>
            </div>
            <div className="job-description">
              <p>{jobDetails?.description}</p>
            </div>
            <div className="job-location-salary">
              <div>
                <strong>Location:</strong> {jobDetails?.location}
              </div>
              <div>
                <strong>Salary:</strong> {jobDetails?.salary}
              </div>
            </div>
            <div className="job-category-type">
              <div>
                <strong>Job Category:</strong> {jobDetails?.category?.name}
              </div>
              <div>
                <strong>Employment Type:</strong> {jobDetails?.employmentType}
              </div>
            </div>
            <div className="job-skills-benefits">
              <div>
                <strong>Skills:</strong> {jobDetails?.skills}
              </div>
              <div>
                <strong>Benefits:</strong> {jobDetails?.benefits}
              </div>
            </div>
            <div className="job-skills-benefits">
              <div>
                <strong>Posted By:</strong>{" "}
                {jobDetails?.createdBy?.email || "Deleted user."}
              </div>
              <div>
                <strong>Job Status:</strong>{" "}
                {jobDetails?.isActive ? "Active" : "Closed"}
              </div>
              <div>
                <strong>Updated at:</strong>{" "}
                {formatDate(jobDetails?.updatedAt || "", "en-US")}
              </div>
              <div></div>
            </div>
          </div>

<CandidateApplications jobId={jobId} candidates={candidates} loading={loadingApplications} setCandidates={setCandidates} />
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
                  className="update-status-button"
                  onClick={changeStatusHandler}
                >
                  {jobDetails?.isActive ? "Deactivate Job" : "Activate Job"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DetailsJob;
