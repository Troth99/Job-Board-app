import { useNavigate, useParams, useSearchParams } from "react-router";
import "./FilterJobsByCategory.css";
import useJobs from "../../hooks/utils/useJobs";
import { useEffect, useState } from "react";
import { ShowJobs } from "../../showJobs/showJobs";
import { LoadingIndicator } from "../../LoadingIndicator/LoadingIndicator";
import { FilterGroup } from "./FilterGroup/FilterGroup";
import { employmentOptions } from "../Jobs/formSelectedInputs";
import { useJobFilters } from "../../hooks/useJobFilters";
import { Job } from "../../interfaces/Job.model";
import Pagination from "../Pagination/Pagination";
import { Helmet } from "react-helmet-async";
import { generateSeoConfig } from "../../seo/seo";

const ITEMS_PER_PAGE = 3;

//responsive css doesnt work on mobile

export default function FilterJobByCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 3);

  const { categoryName } = useParams<{ categoryName: string }>();
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getJobsByCategoryName } = useJobs();
  const [totalCount, setTotalCount] = useState<number>(0);

  const seo = generateSeoConfig("category", categoryName);

  const navigate = useNavigate();
  const {
    selectedTypes,
    handleCompanyChange,
    handleTypeChange,
    selectedCompanies,
    setSelectedTypes,
    filteredJobs,
    setSelectedCompanies,
  } = useJobFilters(jobsData);

  const clearFilter = () => {
    setSelectedTypes([]);
    setSelectedCompanies([]);
  };

  // Extract unique company names for the company filter options
  const companyOptions = [
    ...new Set(
      jobsData
        .map((job) => job.company?.name)
        .filter((name): name is string => Boolean(name)),
    ),
  ];

  useEffect(() => {
    const getJobs = async () => {
      if (!categoryName) return;
      setLoading(true);
      try {
        const result = await getJobsByCategoryName(
          categoryName,
          pageFromUrl,
          ITEMS_PER_PAGE,
        );
        setJobsData(result.jobs);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, [categoryName, pageFromUrl]);

  return (
<>
    <Helmet>
      <title>{seo.title}</title>
      <meta
        name="description"
        content={seo.description}
      />
    </Helmet>
    <div className="filter-jobs-container">
      <div className="filter-header">
        <div className="filter-title">
          <h1>
            Jobs from <span className="category-highlight">{categoryName}</span>
          </h1>
          <p className="subtitle">Explore opportunities from {categoryName}</p>
        </div>
        <div className="filter-stats">
          <span className="job-count">{totalCount} Total Jobs found</span>
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
          </div>
          <div className="filter-section">
            <FilterGroup
              title="Company"
              options={companyOptions}
              selected={selectedCompanies}
              onChange={handleCompanyChange}
            />
            <button className="clear-filters" onClick={clearFilter}>
              Clear All Filters
            </button>
          </div>
        </aside>

        <main className="jobs-list-area">
          {loading ? (
            <div className="loading-indicator-center">
              <LoadingIndicator message="Loading jobs..." size="medium" />
            </div>
          ) : jobsData.length > 0 ? (
            <>
              <ShowJobs
                jobs={filteredJobs}
                onJobClick={(jobId) => navigate(`/job/${jobId}`)}
              />

              {filteredJobs.length > 0 && totalCount > ITEMS_PER_PAGE && filteredJobs.length === ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={pageFromUrl}
                  totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
                  totalItems={totalCount}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={(page) =>
                    setSearchParams({ page: page.toString() })
                  }
                />
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
    </>
  );
}
