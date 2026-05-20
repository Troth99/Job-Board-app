import { useEffect, useState } from "react";
import useJobs from "../../../hooks/utils/useJobs";
import Spinner from "../../Spinner/Spinner";
import "./ViewAllJobs.css";
import { useNavigate, useSearchParams } from "react-router";
import { Job } from "../../../interfaces/Job.model";
import { Container } from "../../Container/Container";
import Pagination from "../../Pagination/Pagination";
import usePagination from "../../../hooks/shared/usePagination";

const ITEMS_PER_PAGE = 5;

const formatPostedDate = (date?: string) => {
  if (!date) {
    return "Recently posted";
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently posted";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

function ViewAllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const { loading, getJobsPage } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobsPage(pageFromUrl, ITEMS_PER_PAGE);
        console.log("response.jobs", response.jobs);

        const sortedJobs = response.jobs.sort(
          (a: Job, b: Job) =>
            new Date(b.createdAt ?? "").getTime() -
          new Date(a.createdAt ?? "").getTime(),
        );
        setJobs(sortedJobs);
        setTotalJobs(response.totalJobs);

      } catch (error) {
        console.error("Failed to set jobs.");
      }
    };
    fetchJobs();
  }, [pageFromUrl]);

  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <Container>
      <section className="jobs-board-page">
        <header className="jobs-board-hero">
          <div>
            <p className="jobs-board-kicker">Opportunities</p>
            <h1 className="jobs-board-title">Browse all open roles</h1>
            <p className="jobs-board-subtitle">
              Fresh listings in one place, sorted by newest first so the latest
              opportunities stay visible.
            </p>
          </div>
          <div className="jobs-board-stats" aria-label="Job listing statistics">
            <div className="jobs-board-stat-card">
              <span className="jobs-board-stat-value">{totalJobs}</span>
              <span className="jobs-board-stat-label">Total jobs</span>
            </div>
            <div className="jobs-board-stat-card">
              <span className="jobs-board-stat-value">{pageFromUrl}</span>
              <span className="jobs-board-stat-label">Current page</span>
            </div>
          </div>
        </header>

        <div className="jobs-list-modern">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <article
                className="job-card-modern"
                key={job._id}
                onClick={() => navigate(`/job/${job._id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/job/${job._id}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="job-card-topline">
                  <span className="job-company-modern">
                    {typeof job.company === "string"
                      ? job.company
                      : (job.company?.name ?? "Company")}
                  </span>
                  <span
                    className={`job-status-modern ${job.isActive ? "is-active" : "is-closed"}`}
                  >
                    {job.isActive ? "Active" : "Closed"}
                  </span>
                </div>

                <div className="job-card-main">
                  <div className="job-header-modern">
                    <h2 className="job-title-modern">{job.title}</h2>
                    <span className="job-location-modern">{job.location}</span>
                  </div>

                  <div className="job-info-modern">
                    <span className="job-pill job-type-modern">
                      {job.employmentType}
                    </span>
                    <span className="job-pill job-salary-modern">
                      {job.salary || "Salary not specified"}
                    </span>
                    <span className="job-pill job-date-modern">
                      {formatPostedDate(job.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="job-card-footer">
                  <span className="job-posted-by-modern">
                    Posted by {job.createdBy?.firstName || "Unknown"}{" "}
                    {job.createdBy?.lastName || "recruiter"}
                  </span>
                  <span className="job-apply-btn-modern">View details</span>
                </div>
              </article>
            ))
          ) : (
            <div className="no-jobs-modern">
              <p className="no-jobs-title">No jobs found.</p>
              <p className="no-jobs-text">
                Try again later or adjust the filters from the previous page.
              </p>
            </div>
          )}
          {jobs.length > 0 && (
            <Pagination
              currentPage={pageFromUrl}
              totalPages={Math.ceil(totalJobs / ITEMS_PER_PAGE)}
              totalItems={totalJobs}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={(page) =>
                setSearchParams({ page: page.toString() })
              }
            />
          )}
        </div>
      </section>
    </Container>
  );
}

export default ViewAllJobs;
