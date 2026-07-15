import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useJobs from "../../../../jobs/hooks/useJobsAPI";
import { Job } from "../../../../jobs/types/Job.model";
import Spinner from "../../../../../shared/components/Spinner/Spinner";
import { ShowJobs } from "../../../../companies/components/showJobs/showCompanyJobs";
import { useTranslation } from "react-i18next";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { getAllJobs } = useJobs();
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      {results.length === 0 ? (
        <div className="search-no-jobs-f1">
          <span
            role="img"
            aria-label="search-icon"
            style={{ fontSize: "2.5rem", marginBottom: "12px", opacity: 0.7 }}
          >
            🔍
          </span>
          {t('search.noJobsFound', 'No jobs found.')}
        </div>
      ) : (
        <ShowJobs
          jobs={results}
          onJobClick={(jobId) => navigate(`/job/${jobId}`)}
        />
      )}
    </div>
  );
}
