import { useNavigate, useParams, useSearchParams } from "react-router";
import "./FilterJobsByCategory.css";
import useJobs from "../../hooks/useJobs";
import { useEffect, useState } from "react";
import { Job } from "../Jobs/CreateJob/CreateJob";
import { ShowJobs } from "../../showJobs/showJobs";
import { LoadingIndicator } from "../../LoadingIndicator/LoadingIndicator";
import { usePagination } from "../../hooks/usePagination";
import { FilterGroup } from "./FilterGroup/FilterGroup";
import { employmentOptions } from "../Jobs/formSelectedInputs";
import { useJobFilters } from "../../hooks/useJobFilters";

export function FilterJobByCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const { categoryName } = useParams<{ categoryName: string }>();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getJobsByCategoryName } = useJobs();
  const navigate = useNavigate();
  const {
    selectedTypes,
    handleCompanyChange,
    handleTypeChange,
    filteredJobs,
    selectedCompanies,
  } = useJobFilters(jobsData);
  const { totalPages, currentItems } = usePagination(
    filteredJobs,
    3,
    pageFromUrl
  );

  //Get company names, that have current posted jobs.
  const companyOptions = [
    ...new Set(
      jobsData
        .map((job) => job.company?.name)
        .filter((name): name is string => Boolean(name))
    ),
  ];

  console.log(currentItems);

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
            <FilterGroup
              title="Job Type"
              options={employmentOptions.map((option) => option.value)}
              selected={selectedTypes}
              onChange={handleTypeChange}
            />
            /
          </div>
          <div className="filter-section">
            <FilterGroup
              title="Company"
              options={companyOptions}
              selected={selectedCompanies}
              onChange={handleCompanyChange}
            />
            <button className="clear-filters">Clear All Filters</button>
          </div>
        </aside>

        <main className="jobs-list-area">
          {loading ? (
            <LoadingIndicator message="Loading jobs..." size="medium" />
          ) : jobsData.length > 0 ? (
            <>
              <ShowJobs
                jobs={currentItems}
                onJobClick={(jobId) => navigate(`/job/${jobId}`)}
              />

              {filteredJobs.length > 3 && (
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
            </>
          ) : (
            <div className="no-jobs-message">
              <i className="fa-solid fa-briefcase"></i>
              <h3>No jobs found</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
