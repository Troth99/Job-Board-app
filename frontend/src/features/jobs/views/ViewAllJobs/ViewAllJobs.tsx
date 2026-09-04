import { useEffect, useState } from "react";
import useJobs from "../../hooks/useJobsAPI";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import "./ViewAllJobs.css";
import { useNavigate, useSearchParams } from "react-router";
import { Job } from "../../types/Job.model";
import { Container } from "../../../../shared/components/Container/Container";
import Pagination from "../../../../shared/components/Pagination/Pagination";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import { Trans } from "@lingui/react/macro";

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
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 5);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);

  const seo = () => generateSeoConfig("viewAllJobs");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobsPage(pageFromUrl, ITEMS_PER_PAGE);

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

  return (
    <Container>
      <MetaData seo={seo} />

      {loading ? (
        <Spinner variant="fullpage" />
      ) : (
        <section className="jobs-board-page">
          <header className="jobs-board-hero">
            <div>
              <p className="jobs-board-kicker">
                <Trans>Opportunities</Trans>
              </p>
              <h1 className="jobs-board-title">
                <Trans>Browse all open roles</Trans>
              </h1>
              <p className="jobs-board-subtitle">
                <Trans>
                  Fresh listings in one place, sorted by newest first so the
                  latest opportunities stay visible.
                </Trans>
              </p>
            </div>
            <div
              className="jobs-board-stats"
              aria-label="Job listing statistics"
            >
              <div className="jobs-board-stat-card">
                <span className="jobs-board-stat-value">{totalJobs}</span>
                <span className="jobs-board-stat-label">
                  <Trans>Total jobs</Trans>
                </span>
              </div>
              <div className="jobs-board-stat-card">
                <span className="jobs-board-stat-value">{pageFromUrl}</span>
                <span className="jobs-board-stat-label">
                  <Trans>Current page</Trans>
                </span>
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
                      <span className="job-location-modern">
                        {job.location}
                      </span>
                    </div>

                    <p className="job-description-modern">
                      {job.description || "Explore this opportunity and discover what the role has to offer."}
                    </p>

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
                      <Trans>Posted by</Trans>{" "}
                      {job.createdBy?.firstName || job.createdBy?.lastName
                        ? `${job.createdBy.firstName || ""} ${job.createdBy.lastName || ""}`.trim()
                        : "Company team"}
                    </span>
                    <span className="job-apply-btn-modern">View details</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-jobs-modern">
                <p className="no-jobs-title">
                  <Trans>No jobs found.</Trans>
                </p>
                <p className="no-jobs-text">
                  <Trans>
                    Try again later or adjust the filters from the previous
                    page.
                  </Trans>
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
      )}
    </Container>
  );
}

export default ViewAllJobs;
