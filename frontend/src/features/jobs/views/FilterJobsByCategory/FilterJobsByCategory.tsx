import { useNavigate, useParams, useSearchParams } from "react-router";
import "./FilterJobsByCategory.css";
import useJobs from "../../hooks/useJobBoard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "../../../../shared/components/LoadingIndicator/LoadingIndicator";
import { FilterGroup } from "../../components/FilterJobsByCategory/FilterGroup";
import { employmentOptions, } from "../../form/formSelectedInputs";
  
import { Job } from "../../types/Job.model";
import Pagination from "../../../../shared/components/Pagination/Pagination";
import { Helmet } from "react-helmet-async";
import { generateSeoConfig } from "../../../../seo/seo";
import { useJobFilters } from "../../hooks/useJobFilters";
import { ShowJobs } from "../../../companies/components/showJobs/showCompanyJobs";
import { Trans, useLingui } from "@lingui/react/macro";
import { RootState } from "../../../../store/store";
import { getTranslatedEmploymentLabel } from "../../helpers/getTranslatedEmploymentLabel";

const ITEMS_PER_PAGE = 3;

//responsive css doesnt work on mobile

export default function FilterJobByCategory() {
  const { i18n, t } = useLingui();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 3);

  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : "";


  const matchedCategory = categories.find((cat) => cat.name === decodedCategoryName);

  // Determine the localized category name based on the current locale language

  const localizedCategoryName = i18n.locale.startsWith("bg")
    ? matchedCategory?.bgName || decodedCategoryName
    : decodedCategoryName;

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
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.url && <link rel="canonical" href={seo.url} />}
      {seo.noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
    <div className="filter-jobs-container">
      <div className="filter-header">
        <div className="filter-title">
          <h1>
            <Trans>Jobs from</Trans> <span className="category-highlight">{localizedCategoryName}</span>
          </h1>
          <p className="subtitle"><Trans>Explore opportunities from</Trans> {localizedCategoryName}</p>
        </div>
        <div className="filter-stats">
          <span className="job-count">{totalCount} <Trans>Total Jobs found</Trans></span>
        </div>
      </div>

      <div className="filter-content">
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3><Trans>Filters</Trans></h3>
            <FilterGroup
              title={t`Job Type`}
              options={employmentOptions.map((option) => ({
                value: option.value,
                label: getTranslatedEmploymentLabel(option.value),
              }))}
              selected={selectedTypes}
              onChange={handleTypeChange}
            />
          </div>
          <div className="filter-section">
            <FilterGroup
              title={t`Company`}
              options={companyOptions}
              selected={selectedCompanies}
              onChange={handleCompanyChange}
            />
            <button className="clear-filters" onClick={clearFilter}>
              <Trans>Clear All Filters</Trans>
            </button>
          </div>
        </aside>

        <main className="jobs-list-area">
          {loading ? (
            <div className="loading-indicator-center">
              <LoadingIndicator message={t`Loading jobs...`} size="medium" />
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
              <h3><Trans>No jobs found</Trans></h3>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
}
