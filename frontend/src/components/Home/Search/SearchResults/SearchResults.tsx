import { useEffect, useState } from "react";
import { Job } from "../../../../interfaces/Job.model";
import { useSearchParams } from "react-router";
import useJobs from "../../../../hooks/useJobs";
import { ShowJobs } from "../../../../showJobs/showJobs";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { getAllJobs } = useJobs();
  const [results, setResults] = useState<Job[]>([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      const allJobs = await getAllJobs();
      const filtered = allJobs.filter((job: Job) =>
        job.title?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    };
    fetchAndFilter();
  }, [query]);
  return (
    <div className="search-results-container">
      {results.length === 0 ? (
        <div className="search-no-jobs-f1">
          <span role="img" aria-label="search-icon" style={{fontSize: '2.5rem', marginBottom: '12px', opacity: 0.7}}>🔍</span>
          No jobs found.
        </div>
      ) : (
        <ShowJobs jobs={results} />
      )}
    </div>
  );
}
