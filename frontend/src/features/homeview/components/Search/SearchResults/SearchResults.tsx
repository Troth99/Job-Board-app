import { useEffect, useState } from "react";
import { Trans } from "@lingui/react/macro";
import { useNavigate, useSearchParams } from "react-router";
import useJobs from "../../../../jobs/hooks/useJobsAPI";
import { Job } from "../../../../jobs/types/Job.model";
import Spinner from "../../../../../shared/components/Spinner/Spinner";
import { ShowJobs } from "../../../../companies/components/showCompanyJobs/showCompanyJobs";
import "../../../styles/Search.css";
import "../../../styles/Responsive.css";
import "../../../styles/buttons.css";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { getAllJobs } = useJobs();
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndFilter = async () => {
      setLoading(true);
      try {
        const allJobs = await getAllJobs();

        const filtered = (allJobs.jobs || []).filter((job: Job) =>
          job.title?.toLowerCase().includes(query.toLowerCase()),
        );
        setResults(filtered);
      } catch (error) {
        console.error("Failed to search job");
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilter();
  }, [query]);
  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <div className="search-results-container">
      <header className="search-results-header">
        <div>
          <span className="search-results-eyebrow"><Trans>Job search</Trans></span>
          <h1><Trans>Search results</Trans></h1>
          <p>
            <Trans>Showing opportunities matching</Trans>{" "}
            <strong>"{query}"</strong>
          </p>
        </div>
        <span className="search-results-count">
          {results.length} <Trans>found</Trans>
        </span>
      </header>
      {results.length === 0 ? (
        <div className="search-no-jobs-f1">
          <span
            role="img"
            aria-label="search-icon"
            style={{ fontSize: "2.5rem", marginBottom: "12px", opacity: 0.7 }}
          >
            🔍
          </span>
          <Trans>No jobs found.</Trans>
        </div>
      ) : (
        <ShowJobs
          jobs={results}
          variant="search"
          onJobClick={(jobId) => navigate(`/job/${jobId}`)}
        />
      )}
    </div>
  );
}
