import useJobs from "../../../hooks/useJobs";
import { Candidate } from "../../../interfaces/Apllication.model";
import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";
import { formatDate } from "../../../utils/formData";

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
  const { updateApplicationStatus } = useJobs();

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
      console.error("Faileld to set status.", error);
    }
  };

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
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.email}</td>
                <td>
                  <a
                    href={candidate.cv}
                    target="_blank"
                    className="cv-link"
                    onClick={() => viewCvHandler(candidate._id)}
                  >
                    View CV
                  </a>
                </td>
                <td>
                  {candidate.appliedAt
                    ? formatDate(candidate.appliedAt, "en-US")
                    : ""}
                </td>
                <td>{candidate.status}</td>
                <td>
                  <button
                    className={`approve-button ${
                      candidate.status === "approved" ? "disabled" : ""
                    }`}
                    onClick={() => approveHandler(candidate._id)}
                    disabled={candidate.status === "approved"}
                  >
                    Approve
                  </button>
                  <button className="reject-button">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
