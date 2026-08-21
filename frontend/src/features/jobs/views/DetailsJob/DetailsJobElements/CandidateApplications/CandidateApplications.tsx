import "../../../../styles/candidateApllications.css";
import useApplications from "../../../../hooks/useJobApplications";
import { Candidate } from "../../../../types/Apllication.model";
import { LoadingIndicator } from "../../../../../../shared/components/LoadingIndicator/LoadingIndicator";
import { formatDate } from "../../../../../../shared/utils/formData";
import { useParams } from "react-router";
import useNotifications from "../../../../../notifications/hooks/useNotifications";

const getStatusClassName = (status?: string) => {
  switch (status) {
    case "approved":
      return "candidate-applications__status--approved";
    case "pending":
      return "candidate-applications__status--pending";
    case "rejected":
      return "candidate-applications__status--rejected";
    default:
      return "candidate-applications__status--new";
  }
};

const getStatusLabel = (status?: string) => {
  if (!status) {
    return "New";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
};

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
  const { updateApplicationStatus, deleteApplication } = useApplications();
const {companyId} = useParams()
  const {createNotification} = useNotifications();




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

    
      const currentCandidate = candidates.find(c => c._id === candidateId)

      if(!currentCandidate) {
        console.error("Candidate not found!")
        return
      };

     await updateApplicationStatus(candidateId, "approved");
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: "approved" }
            : candidate
        )
      );
      await createNotification({
        user: currentCandidate.userId,
        message: 'You have been accepted for the job.',
        type: "application"
      })
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
    <section className="candidate-applications" data-job-id={jobId}>
      <div className="candidate-applications__header">
        <div>
          <span className="candidate-applications__eyebrow">
            Candidate pipeline
          </span>
          <h3>Candidate Applications</h3>
          <p>
            Review every application, open resumes, and move strong candidates
            through the process quickly.
          </p>
        </div>
        <div className="candidate-applications__count">
          {candidates.length} {candidates.length === 1 ? "candidate" : "candidates"}
        </div>
      </div>

      {loading ? (
        <div className="candidate-applications__state">
          <LoadingIndicator message="Loading applications..." size="small" />
        </div>
      ) : candidates.length === 0 ? (
        <div className="candidate-applications__empty">
          No candidates applied for this job.
        </div>
      ) : (
        <div className="candidate-applications__table-shell">
          <table className="candidate-applications__table">
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
                      rel="noreferrer"
                      className="candidate-applications__cv-link"
                      onClick={() => viewCvHandler(candidate._id)}
                    >
                      View CV
                    </a>
                  </td>
                  <td data-label="Phone">{candidate.phone || "Not provided"}</td>
                  <td data-label="Applied On">
                    {candidate.appliedAt
                      ? formatDate(candidate.appliedAt, "en-US")
                      : "Not available"}
                  </td>
                  <td data-label="Status">
                    <span
                      className={`candidate-applications__status ${getStatusClassName(candidate.status)}`}
                    >
                      {getStatusLabel(candidate.status)}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="candidate-applications__actions">
                      <button
                        className="candidate-applications__button candidate-applications__button--approve"
                        onClick={() => approveHandler(candidate._id)}
                        disabled={candidate.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="candidate-applications__button candidate-applications__button--reject"
                        onClick={() => rejectHandler(candidate._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
