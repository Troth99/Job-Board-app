import { useNavigate, useParams } from "react-router";
import "./Details.css";
import { useEffect, useState } from "react";
import { getUserRole } from "../../../services/companyService";
import { getUserFromLocalStorage } from "../../../services/auth/authService";
import { Job } from "../CreateJob/CreateJob";
import { getJobById } from "../../../services/jobService";
import Spinner from "../../Spinner/Spinner";

export function DetailsJob() {
  const { companyId, jobId } = useParams<{
    companyId: string;
    jobId: string;
  }>();
  const navigate = useNavigate();
  const [jobDetails, setJobdetails] = useState<Job>();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchCurrentJob = async () => {
    try {
      if (jobId) {
        setLoading(true);
        const currentJob = await getJobById(jobId);
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
        const responseRole = await getUserRole(companyId);
        setUserRole(responseRole[0].role);
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
  }, [companyId]);

  const editNavigateHandler = () => {
    navigate(`/company/${companyId}/job/${jobId}/edit`);
  };

  const canEditOrDelete = userRole === "admin" || userRole === "owner";


  return (
    <>
      {loading ? (
        <Spinner overlay={true} />
      ) : (
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
                <strong>Job Category:</strong> {jobDetails?.category}
              </div>
              <div>
                <strong>Employment Type:</strong> {jobDetails?.type}
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
                <strong>Posted By:</strong> {jobDetails?.createdBy.email || 'Deleted user.'}
              </div>
                <div>
              <strong>Job Status:</strong> {jobDetails?.isActive ? "Active" : "Closed"}
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
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
