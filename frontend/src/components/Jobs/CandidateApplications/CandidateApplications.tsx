import { LoadingIndicator } from "../../../LoadingIndicator/LoadingIndicator";
import { formatDate } from "../../../utils/formData";

export function CandidateApplications({
  jobId,
  candidates,
  loading
}: {
  jobId: string;
  candidates: any[];
  loading: boolean;
}) {


  return (
    <div className="candidates-section">
      <h3>Candidate Applications</h3>
      {loading ? (
        <LoadingIndicator message="Loading applications..." size="small"/>
      ): candidates.length === 0 ? (
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
                <a href={candidate.cv} target="_blank" className="cv-link">
                  View CV
                </a>
              </td>
              <td>
                {candidate.appliedAt
                  ? formatDate(candidate.appliedAt, "en-US")
                  : ""}
              </td>
              <td>Pending</td>
              <td>
                <button className="approve-button">Approve</button>
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
