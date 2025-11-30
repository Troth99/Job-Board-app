import { useNavigate, useParams } from "react-router";
import "./FilterJobsByCategory.css";
import useJobs from "../../hooks/useJobs";
import { useEffect, useState } from "react";
import { Job } from "../Jobs/CreateJob/CreateJob";
import { ShowJobs } from "../../showJobs/showJobs";
import { LoadingIndicator } from "../../LoadingIndicator/LoadingIndicator";
import { usePagination } from "../../hooks/usePagination";

export function FilterJobByCategory() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getJobsByCategoryName } = useJobs();
  const navigate = useNavigate()
  
  const {currentPage, totalPages, currentItems, goToNextPage, goToPreviousPage} = usePagination(jobsData, 3)


  useEffect(() => {
    const getJobs = async () => {
      if (!categoryName) return;
      setLoading(true);
      try {
        const jobs = await getJobsByCategoryName(categoryName);
        setJobsData(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, [categoryName]);

  return (
    <div className="filter-jobs-container">
      <div className="filter-header">
        <div className="filter-title">
          <h1>
            Jobs from <span className="category-highlight">{categoryName}</span>
          </h1>
          <p className="subtitle">Explore opportunities from {categoryName}</p>
        </div>
        <div className="filter-stats">
          <span className="job-count">{jobsData.length} jobs found</span>
        </div>
      </div>

      <div className="filter-content">
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Filters</h3>

            <div className="filter-group">
              <h4>Location</h4>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Remote</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>On-site</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Hybrid</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h4>Experience Level</h4>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Entry Level</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Mid Level</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Senior Level</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <h4>Job Type</h4>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Full-time</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Part-time</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>Contract</span>
                </label>
              </div>
            </div>

            <button className="clear-filters">Clear All Filters</button>
          </div>
        </aside>

        <main className="jobs-list-area">
          {loading ? (
            <LoadingIndicator message="Loading jobs..." size="medium"/>
          ) : jobsData.length > 0 ? (
            <>
              <ShowJobs jobs={currentItems} onJobClick={(jobId) => navigate(`/job/${jobId}`)}/>
              
              {jobsData.length > 3 && (
                <div className="pagination">
                  <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-jobs-message">
              <i className="fa-solid fa-briefcase"></i>
              <h3>No jobs found</h3>
              <p>Try adjusting your filters or check back later</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
