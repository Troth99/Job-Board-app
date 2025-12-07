import { useEffect, useState } from "react";
import { Job } from "../../../../interfaces/Job.model";
import { useSearchParams } from "react-router";
import useJobs from "../../../../hooks/useJobs";
import { ShowJobs } from "../../../../showJobs/showJobs";
import Spinner from "../../../Spinner/Spinner";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { getAllJobs } = useJobs();
  const [results, setResults] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchAndFilter = async () => {
      setLoading(true)
      try {
        const allJobs = await getAllJobs();
        const filtered = allJobs.filter((job: Job) =>
          job.title?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        
      } catch (error) {
        console.error('Failed to search job')
      }finally {
        setLoading(false)
      }
    };
    fetchAndFilter();
  }, [query]);
  if(loading) {
    return <Spinner overlay={true} />
  }
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
