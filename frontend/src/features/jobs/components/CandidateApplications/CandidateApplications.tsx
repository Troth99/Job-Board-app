import { useMemo, useState } from "react";
import "../../styles/candidateApllications.css";
import useApplications from "../../hooks/useJobApplications";
import { Candidate } from "../../types/Apllication.model";
import { LoadingIndicator } from "../../../../shared/components/LoadingIndicator/LoadingIndicator";
import { formatDate } from "../../../../shared/utils/formData";
import { useParams } from "react-router";
import useNotifications from "../../../notifications/hooks/useNotifications";
import { Trans } from "@lingui/react/macro";
import { t } from "@lingui/core/macro";

const CANDIDATES_PER_PAGE = 10;
const STATUS_FILTERS = ["all", "new", "pending", "approved"] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];

const normalizeStatus = (status?: string) => {
  if (!status || status.trim().length === 0) {
    return "new";
  }

  return status.toLowerCase();
};

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
// Function to get a user-friendly label for the status
const getStatusLabel = (status?: string) => {
  switch (normalizeStatus(status)) {
    case "approved":
      return t`Approved`;
    case "pending":
      return t`Pending`;
    case "rejected":
      return t`Rejected`;
    default:
      return t`New`;
  }
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
  const { companyId } = useParams();
  const { createNotification } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized computation of status counts for the candidates
  const statusCounts = useMemo(() => {
    return candidates.reduce(
      (accumulator, candidate) => {
        const normalizedStatus = normalizeStatus(candidate.status);
        accumulator.all += 1;

        if (normalizedStatus === "pending") {
          accumulator.pending += 1;
        } else if (normalizedStatus === "approved") {
          accumulator.approved += 1;
        } else {
          accumulator.new += 1;
        }

        return accumulator;
      },
      { all: 0, new: 0, pending: 0, approved: 0 },
    );
  }, [candidates]);

  // Memoized computation of filtered candidates based on the active filter
  const filteredCandidates = useMemo(() => {
    if (activeFilter === "all") {
      return candidates;
    }

    return candidates.filter(
      (candidate) => normalizeStatus(candidate.status) === activeFilter,
    );
  }, [activeFilter, candidates]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCandidates.length / CANDIDATES_PER_PAGE),
  );
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * CANDIDATES_PER_PAGE,
    currentPage * CANDIDATES_PER_PAGE,
  );

  const handleFilterChange = (filter: StatusFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

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
      const currentCandidate = candidates.find((candidate) => candidate._id === candidateId);

      if (!currentCandidate) {
        console.error("Candidate not found!");
        return;
      }

      await updateApplicationStatus(candidateId, "approved");
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: "approved" }
            : candidate
        )
      );
      if(currentCandidate) {
        await createNotification({
          user: currentCandidate.userId,
          message: "You have been accepted for the job.",
          type: "application",
          accepted: true,
          rejected: false,
        });
      }

    } catch (error) {
      console.error("Faileld to set status or add member.", error);
    }
  };

  const rejectHandler = async (candidateId: string) => {
    try {
      const currentCandidate = candidates.find((candidate) => candidate._id === candidateId);

      if(!currentCandidate) {
        console.error("Candidate not found!");
        return;
      }

      await updateApplicationStatus(candidateId, "rejected");
      setCandidates((prev) =>
        prev.map((candidate) => 
          candidate._id === candidateId
            ? { ...candidate, status: "rejected" }
            : candidate
        )
      );
      if (currentCandidate) {
        await createNotification({
          user: currentCandidate.userId,
          message: "You have been rejected for the job.",
          type: "application",
          accepted: false,
          rejected: true,
        });
      }
    } catch (error) {
      console.error("Faileld to set status.", error);
    }
  };

  const removeApprovedHandler = async (candidateId: string) => {
    try {
      await deleteApplication(candidateId);
      setCandidates((candidate) =>
        candidate.filter((application) => application._id !== candidateId),
      );
    } catch (error) {
      console.error("Failed to remove approved candidate.", error);
    }
  };

  return (
    <section className="candidate-applications" data-job-id={jobId}>
      <div className="candidate-applications__header">
        <div>
          <span className="candidate-applications__eyebrow">
            <Trans>Candidate pipeline</Trans>
          </span>
          <h3><Trans>Candidate Applications</Trans></h3>
          <p>
            <Trans>
              Review every application, open resumes, and move strong candidates
              through the process quickly.
            </Trans>
          </p>
        </div>
        <div className="candidate-applications__count">
          {candidates.length}{" "}
          {candidates.length === 1 ? <Trans>candidate</Trans> : <Trans>candidates</Trans>}
        </div>
      </div>

      {loading ? (
        <div className="candidate-applications__state">
          <LoadingIndicator message={t`Loading applications...`} size="small" />
        </div>
      ) : candidates.length === 0 ? (
        <div className="candidate-applications__empty">
          <Trans>No candidates applied for this job.</Trans>
        </div>
      ) : (
        <>
          <div className="candidate-applications__summary-grid">
            <article className="candidate-applications__summary-card is-all">
              <span><Trans>Total</Trans></span>
              <strong>{statusCounts.all}</strong>
            </article>
            <article className="candidate-applications__summary-card is-new">
              <span><Trans>New</Trans></span>
              <strong>{statusCounts.new}</strong>
            </article>
            <article className="candidate-applications__summary-card is-pending">
              <span><Trans>Pending</Trans></span>
              <strong>{statusCounts.pending}</strong>
            </article>
            <article className="candidate-applications__summary-card is-approved">
              <span><Trans>Approved</Trans></span>
              <strong>{statusCounts.approved}</strong>
            </article>
          </div>

          <div className="candidate-applications__toolbar">
            <div className="candidate-applications__filters" role="tablist" aria-label={t`Candidate status filters`}>
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`candidate-applications__filter ${
                    activeFilter === filter ? "is-active" : ""
                  }`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter === "all" ? <Trans>All</Trans> : getStatusLabel(filter)}
                  <span className="candidate-applications__filter-count">
                    {statusCounts[filter]}
                  </span>
                </button>
              ))}
            </div>

            {filteredCandidates.length > CANDIDATES_PER_PAGE ? (
              <div className="candidate-applications__results-meta">
                <Trans>
                  Showing {(currentPage - 1) * CANDIDATES_PER_PAGE + 1}-
                  {Math.min(currentPage * CANDIDATES_PER_PAGE, filteredCandidates.length)} of {filteredCandidates.length}
                </Trans>
              </div>
            ) : null}
          </div>

          {filteredCandidates.length === 0 ? (
            <div className="candidate-applications__empty">
              <Trans>No candidates match the selected status.</Trans>
            </div>
          ) : (
            <div className="candidate-applications__table-shell">
          <table className="candidate-applications__table">
            <thead>
              <tr>
                <th><Trans>Email</Trans></th>
                <th><Trans>CV</Trans></th>
                <th><Trans>Phone</Trans></th>
                <th><Trans>Applied On</Trans></th>
                <th><Trans>Status</Trans></th>
                <th><Trans>Actions</Trans></th>
              </tr>
            </thead>
            <tbody>
              {paginatedCandidates.map((candidate) => (
                <tr key={candidate._id}>
                  <td data-label={t`Email`}>{candidate.email}</td>
                  <td data-label={t`CV`}>
                    <a
                      href={candidate.cv}
                      target="_blank"
                      rel="noreferrer"
                      className="candidate-applications__cv-link"
                      onClick={() => viewCvHandler(candidate._id)}
                    >
                      <Trans>View CV</Trans>
                    </a>
                  </td>
                  <td data-label={t`Phone`}>{candidate.phone || t`Not provided`}</td>
                  <td data-label={t`Applied On`}>
                    {candidate.appliedAt
                      ? formatDate(candidate.appliedAt, "en-US")
                      : t`Not available`}
                  </td>
                  <td data-label={t`Status`}>
                    <span
                      className={`candidate-applications__status ${getStatusClassName(candidate.status)}`}
                    >
                      {getStatusLabel(candidate.status)}
                    </span>
                  </td>
                  <td data-label={t`Actions`}>
                    <div className="candidate-applications__actions">
                      <button
                        className="candidate-applications__button candidate-applications__button--approve"
                        onClick={() => approveHandler(candidate._id)}
                        disabled={candidate.status === "approved"}
                      >
                        <Trans>Approve</Trans>
                      </button>
                      <button
                        className="candidate-applications__button candidate-applications__button--reject"
                        onClick={() => rejectHandler(candidate._id)}
                        disabled={candidate.status === "approved"}
                      >
                        <Trans>Reject</Trans>
                      </button>
                      <button
                        type="button"
                        className="candidate-applications__button candidate-applications__button--remove"
                        onClick={() => removeApprovedHandler(candidate._id)}
                        disabled={candidate.status !== "approved"}
                        aria-label={t`Remove ${candidate.email}`}
                        title={
                          candidate.status === "approved"
                            ? t`Remove approved candidate`
                            : t`Approve candidate first to unlock removal`
                        }
                      >
                        X
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          )}

          {filteredCandidates.length > CANDIDATES_PER_PAGE ? (
            <div className="candidate-applications__pagination">
              <button
                type="button"
                className="app-button app-button--secondary candidate-applications__pagination-button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                <Trans>Previous</Trans>
              </button>
              <span className="candidate-applications__pagination-label">
                <Trans>
                  Page {currentPage} of {totalPages}
                </Trans>
              </span>
              <button
                type="button"
                className="app-button app-button--secondary candidate-applications__pagination-button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                <Trans>Next</Trans>
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
