import { useNavigate, useParams } from "react-router";
import "./Details.css";
import { useEffect, useState } from "react";
import { Job } from "../CreateJob/CreateJob";
import { getJobById, updateJob } from "../../../services/jobService";
import Spinner from "../../Spinner/Spinner";
import { formatDate } from "../../../utils/formData";
import useCompany from "../../../hooks/useCompany";

export function DetailsJob() {
  const { companyId, jobId } = useParams<{
    companyId: string;
    jobId: string;
  }>();
  const navigate = useNavigate();
  const [jobDetails, setJobdetails] = useState<Job>();
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState()
  const [jobStatus, setJobStatus] = useState<boolean | undefined>(currentStatus)
  const [statusLoading, setStatusLoading] = useState(false)
  const { getUserRole, userRole } = useCompany();

  const fetchCurrentJob = async () => {
    try {
      if (jobId) {
        setLoading(true);
        const currentJob = await getJobById(jobId);
        setCurrentStatus(currentJob.isActive)
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

  useEffect(() => {
    if (companyId) {
      fetchRole();
    }
    if (jobId) {
      fetchCurrentJob();
    }
  }, [companyId, jobStatus]);

  const editNavigateHandler = () => {
    navigate(`/company/${companyId}/job/${jobId}/edit`);
  };

  const changeStatusHandler = async () => {
    setStatusLoading(true)
    try {
      if(!jobId){
        console.error('Job Id is missing')
        return
      }
      const newStatus = !jobDetails?.isActive

     setJobdetails((prevJob) => ({
          ...prevJob,
          isActive: newStatus
        }))

     const updatedJob: Job = {
      ...jobDetails, 
      isActive: newStatus,
      updatedAt: new Date().toISOString(), 
    };

      setJobStatus(newStatus);

      const response = await updateJob(jobId, updatedJob)

      if(response) {
     
        setJobdetails((prevJob) => ({
          ...prevJob,
          isActive: newStatus
        }))
      }
    } catch (error) {
      console.error('failed to update the status')
    }finally {
      setStatusLoading(false)
    }
  }
  const canEditOrDelete = userRole === "admin" || userRole === "owner";


  return (
    <>
      {loading  ? (
        <Spinner overlay={true} />
      ) : statusLoading ? (
        <Spinner overlay={true} />
      ): (
        <div className="job-details-container">
          <div className="job-overview">
            <div className="job-title">
              <h3>Job Title: {jobDetails?.title}</h3>
            </div>
            <div className="job-description">
              <p>
                {jobDetails?.description}
              </p>
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
                <strong>Posted By:</strong> {jobDetails?.createdBy?.email || 'Deleted user.'}
              </div>
                <div>
              <strong>Job Status:</strong> {jobDetails?.isActive ? "Active" : "Closed"}
              </div>
                   <div>
                <strong>Updated at:</strong> {formatDate(jobDetails?.updatedAt || '', 'en-US')}
              </div>
              <div>
               
              </div>
            </div>
          </div>

          <div className="candidates-section">
            <h3>Candidate Applications</h3>
            <table className="candidates-list">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CV</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>
                    <a
                      href="path/to/cv/johndoe.pdf"
                      target="_blank"
                      className="cv-link"
                    >
                      View CV
                    </a>
                  </td>
                  <td>2023-11-10</td>
                  <td>Pending</td>
                  <td>
                    <button className="approve-button">Approve</button>
                    <button className="reject-button">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>
                    <a
                      href="path/to/cv/janesmith.pdf"
                      target="_blank"
                      className="cv-link"
                    >
                      View CV
                    </a>
                  </td>
                  <td>2023-11-09</td>
                  <td>Approved</td>
                  <td>
                    <button className="approve-button" disabled>
                      Approve
                    </button>
                    <button className="reject-button">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                <button className="delete-job-button">Delete Job</button>
                <button className="update-status-button" onClick={changeStatusHandler}>
                  {jobDetails?.isActive? 'Deactivate Job' : 'Activate Job'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
