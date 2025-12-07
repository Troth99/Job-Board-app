import "./CandidateApplications.css";
import useJobs from "../../../hooks/useJobs";
import useCompany from "../../../hooks/useCompany";
import { Candidate } from "../../../interfaces/Apllication.model";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";
import { formatDate } from "../../../utils/formData";
import { useParams } from "react-router";

export function CandidateApplications({
  jobId,
  candidates,
  loading,
  setCandidates,
}: {
  jobId: string;
  candidates: Candidate[];
  loading: boolean;
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}) {
  const { updateApplicationStatus, deleteApplication } = useJobs();
  const { addMemberToCompany } = useCompany();
const {companyId} = useParams()

  const viewCvHandler = async (candidateId: string) => {
    try {
      await updateApplicationStatus(candidateId, "pending");
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: "pending" }
            : candidate
        )
      );
    } catch (error) {
      console.error("Faileld to set status.", error);
    }
  };

  const approveHandler = async (candidateId: string) => {
    try {
      await updateApplicationStatus(candidateId, "approved");
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: "approved" }
            : candidate
        )
      );
    } catch (error) {
      console.error("Faileld to set status or add member.", error);
    }
  };

  const rejectHandler = async (candidateId: string) => {
    try {
      await deleteApplication(candidateId);
     setCandidates(candidate => candidate.filter(app => app._id !== candidateId));

    } catch (error) {
      console.error("Faileld to set status.", error);
    }
  }
  return (
    <div className="candidates-section">
      <h3>Candidate Applications</h3>
      {loading ? (
        <LoadingIndicator message="Loading applications..." size="small" />
      ) : candidates.length === 0 ? (
        <div className="no-candidates-message">
          No candidates applied for this job.
        </div>
      ) : (
        <table className="candidates-list">
          <thead>
            <tr>
              <th>Email</th>
              <th>CV</th>
              <th>Phone</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td data-label="Email">{candidate.email}</td>
                <td data-label="CV">
                  <a
                    href={candidate.cv}
                    target="_blank"
                    className="cv-link"
                    onClick={() => viewCvHandler(candidate._id)}
                  >
                    View CV
                  </a>
                </td>
                <td data-label="Phone">{candidate?.phone}

                </td>
                <td data-label="Applied On">
                  {candidate.appliedAt
                    ? formatDate(candidate.appliedAt, "en-US")
                    : ""}
                </td>
                <td data-label="Status">{candidate.status}</td>
                <td data-label="Actions">
                  <button
                    className={`approve-button ${
                      candidate.status === "approved" ? "disabled" : ""
                    }`}
                    onClick={() => approveHandler(candidate._id)}
                    disabled={candidate.status === "approved"}
                  >
                    Approve
                  </button>
                  <button 
                  className={`reject-button ${
                    candidate.status ==='rejected' ? "disabled" : ''
                  }`}
                  onClick={() => rejectHandler(candidate._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
