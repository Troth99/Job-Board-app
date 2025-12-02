import { useEffect, useState } from "react";
import useJobs from "../../../hooks/useJobs";
import Spinner from "../../Spinner/Spinner";
import "./ViewAllJobs.css";
import { usePagination } from "../../../hooks/usePagination";
import { useNavigate, useSearchParams } from "react-router";
import { Job } from "../../../interfaces/Job.model";

export function ViewAllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { loading, getAllJobs } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const { currentItems, totalPages } = usePagination(jobs, 5, pageFromUrl);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response);
      } catch (error) {
        console.error("Failed to set jobs.");
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <div className="jobs-list-modern">
      {currentItems.length > 0 ? (
        currentItems.map((job) => (
          <div
            className="job-card-modern"
            key={job._id}
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <div className="job-header-modern">
              <span className="job-company-modern">
                {typeof job.company === "string"
                  ? job.company
                  : job.company?.name ?? ""}
              </span>
              <span className="job-location-modern">{job.location}</span>
            </div>
            <h2 className="job-title-modern">{job.title}</h2>
            <div className="job-info-modern">
              <span className="job-type-modern">{job.employmentType}</span>
              <span className="job-salary-modern">{job.salary}</span>
              <span className="job-status-modern">
                {job.isActive ? "Active" : "Closed"}
              </span>
            </div>
            <span className="job-apply-btn-modern">
              Posted by: {job.createdBy?.firstName} {job.createdBy?.lastName}
            </span>
          </div>
        ))
      ) : (
        <p className="no-jobs-modern">No jobs found.</p>
      )}
      {jobs.length > 5 && (
        <div className="pagination">
          <button
            onClick={() =>
              setSearchParams({ page: (pageFromUrl - 1).toString() })
            }
            disabled={pageFromUrl === 1}
          >
            Previous
          </button>
          <span>
            Page {pageFromUrl} of {totalPages}
          </span>
          <button
            onClick={() =>
              setSearchParams({ page: (pageFromUrl + 1).toString() })
            }
            disabled={pageFromUrl === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
