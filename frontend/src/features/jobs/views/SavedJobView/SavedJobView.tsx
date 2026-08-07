import { useEffect, useState } from "react";
import Spinner from "../../../../shared/components/Spinner/Spinner";
import { Container } from "../../../../shared/components/Container/Container";
import "./SavedJobView.css";
import type { SavedJob } from "../../types/SavedJob.model";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "../../../../shared/components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { CategoryInterface } from "../../../categories/types/CategoryModel";
import { generateSeoConfig } from "../../../../seo/seo";
import MetaData from "../../../../seo/MetaDataTags";
import useFavorites from "../../hooks/useSavedJobs";
import { Trans } from "@lingui/react/macro";

//If i delete a job to remove it from saved jobs also from the job details page,
//  also to add - click on event to see details in a modal, also to add events from the
// calendar view and not only from the job details page

const ITEMS_PER_PAGE = 5;

function SavedJobs() {
  const [favoriteJobs, setFavoriteJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalJobs, setTotalJobs] = useState<number>(0);

  const { categories } = useSelector((state: any) => state.categories);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const { getAllFavoriteJobs } = useFavorites();

  const navigate = useNavigate();

  const seo = () => generateSeoConfig("viewSavedJobs");

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      setLoading(true);

      try {
        const response = await getAllFavoriteJobs(pageFromUrl, ITEMS_PER_PAGE);
        setFavoriteJobs(response.savedJobs);
        setTotalJobs(response.totalSavedJobs);
        console.log(response.totalSavedJobs);
      } catch (error) {
        console.error("Failed to fetch favorite jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteJobs();
  }, [pageFromUrl]);

  return (
    <>
      <MetaData seo={seo} />

      {loading ? (
        <Spinner overlay={true} />
      ) : (
        <Container>
          <div className="saved-jobs-view">
            <div className="saved-jobs-header">
              <h2 className="saved-jobs-heading">
                <span
                  className="saved-jobs-emoji"
                  role="img"
                  aria-label="bookmark"
                >
                  🔖
                </span>
                <span>
                  <Trans>Your Saved Jobs</Trans>
                </span>
                <span className="saved-jobs-count">{favoriteJobs.length}</span>
              </h2>
              <div className="saved-jobs-subtitle">
                <Trans>
                  All jobs you’ve saved in one place. Quick access to your top
                  picks!
                </Trans>
              </div>
            </div>
            {favoriteJobs.length === 0 ? (
              <div className="saved-jobs-empty">
                <span
                  className="saved-jobs-empty-icon"
                  role="img"
                  aria-label="empty"
                >
                  🗂️
                </span>
                <div className="saved-jobs-empty-title">
                  <Trans>You have no saved jobs</Trans>
                </div>
                <div className="saved-jobs-empty-desc">
                  <Trans>Start saving jobs to easily find them later!</Trans>
                </div>
              </div>
            ) : (
              <div className="saved-jobs-modern-list">
                {favoriteJobs.map((fav) => {
                  const job = fav.job || {};
                  const jobCategoryId =
                    typeof job.category === "string"
                      ? job.category
                      : job.category?._id;
                  const categoryName =
                    categories.find(
                      (cat: CategoryInterface) => cat._id === jobCategoryId,
                    )?.name || "-";
                  return (
                    <div
                      key={job._id || fav._id}
                      className="saved-job-modern-card"
                      onClick={() => job._id && navigate(`/job/${job._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        role="img"
                        aria-label="job"
                        className="saved-job-icon"
                      >
                        💼
                      </span>
                      <div className="saved-job-info">
                        <div className="saved-job-title">
                          {job.title || "-"}
                        </div>
                        <div className="saved-job-category">
                          <span className="category-label">
                            <Trans>Category</Trans>:
                          </span>{" "}
                          {categoryName}
                        </div>
                        {job.location && (
                          <div className="saved-job-location">
                            <span className="location-label">
                              <Trans>Location</Trans>:
                            </span>{" "}
                            {job.location}
                          </div>
                        )}
                        {job.salary && (
                          <div className="saved-job-salary">
                            <span className="salary-label">
                              <Trans>Salary</Trans>:
                            </span>{" "}
                            {job.salary}
                          </div>
                        )}
                        {job.employmentType && (
                          <div className="saved-job-type">
                            <span className="type-label">
                              <Trans>Type</Trans>:
                            </span>{" "}
                            {job.employmentType}
                          </div>
                        )}
                        {fav.addedAt && (
                          <div className="saved-job-added">
                            <span className="added-label">
                              <Trans>Added</Trans>:
                            </span>{" "}
                            {new Date(fav.addedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {favoriteJobs.length > 0 && (
              <Pagination
                currentPage={pageFromUrl}
                totalPages={Math.ceil(totalJobs / ITEMS_PER_PAGE)}
                totalItems={totalJobs}
                itemsPerPage={ITEMS_PER_PAGE}
                currentItemsCount={favoriteJobs.length}
                onPageChange={(page) =>
                  setSearchParams({ page: page.toString() })
                }
              />
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default SavedJobs;
