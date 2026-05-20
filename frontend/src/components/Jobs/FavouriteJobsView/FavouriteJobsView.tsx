import { useEffect, useState } from "react";
import { useFavorites } from "../../../hooks/favorites";
import Spinner from "../../Spinner/Spinner";
import { Container } from "../../Container/Container";
import "./FavouriteJobsView.css";
import type { SavedJob } from "../../../context/FavouritesJobsContext";
import { useNavigate, useSearchParams } from "react-router";
import Pagination from "../../Pagination/Pagination";
import { useSelector } from "react-redux";
import { CategoryInterface } from "../../../interfaces/CategoryModel";

const ITEMS_PER_PAGE = 5;

function FavouriteJobsView() {
  const [favoriteJobs, setFavoriteJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalJobs, setTotalJobs] = useState<number>(0);

  const { categories } = useSelector((state: any) => state.categories);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const { getAllFavoriteJobs } = useFavorites();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      setLoading(true);

      try {
        const response = await getAllFavoriteJobs(pageFromUrl, ITEMS_PER_PAGE);
        setFavoriteJobs(response.savedJobs);
        setTotalJobs(response.totalJobs);
      } catch (error) {
        console.error("Failed to fetch favorite jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteJobs();
  }, [pageFromUrl]);

  if (loading) {
    return <Spinner overlay={true} />;
  }
  return (
    <Container>
      <div className="favourite-jobs-view">
        <div className="favourite-jobs-header">
          <h2 className="favourite-jobs-heading">
            <span
              className="favourite-jobs-emoji"
              role="img"
              aria-label="bookmark"
            >
              🔖
            </span>
            <span>Your Favourites Jobs</span>
            <span className="favourite-jobs-count">{favoriteJobs.length}</span>
          </h2>
          <div className="favourite-jobs-subtitle">
            All jobs you’ve saved in one place. Quick access to your top picks!
          </div>
        </div>
        {favoriteJobs.length === 0 ? (
          <div className="favourite-jobs-empty">
            <span
              className="favourite-jobs-empty-icon"
              role="img"
              aria-label="empty"
            >
              🗂️
            </span>
            <div className="favourite-jobs-empty-title">
              You have no favourite jobs
            </div>
            <div className="favourite-jobs-empty-desc">
              Start saving jobs to easily find them later!
            </div>
          </div>
        ) : (
          <div className="favourite-jobs-modern-list">
            {favoriteJobs.map((fav) => {
              const job = fav.job || {};
              const categoryName =
                categories.find((cat: CategoryInterface) => cat._id === job.category)?.name || "-";
              return (
                <div
                  key={job._id || fav._id}
                  className="favourite-job-modern-card"
                  onClick={() => job._id && navigate(`/job/${job._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    role="img"
                    aria-label="job"
                    className="favourite-job-icon"
                  >
                    💼
                  </span>
                  <div className="favourite-job-info">
                    <div className="favourite-job-title">
                      {job.title || "-"}
                    </div>
                    <div className="favourite-job-category">
                      <span className="category-label">Category:</span>{" "}
                      {categoryName}
                    </div>
                    {job.location && (
                      <div className="favourite-job-location">
                        <span className="location-label">Location:</span>{" "}
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="favourite-job-salary">
                        <span className="salary-label">Salary:</span>{" "}
                        {job.salary}
                      </div>
                    )}
                    {job.employmentType && (
                      <div className="favourite-job-type">
                        <span className="type-label">Type:</span>{" "}
                        {job.employmentType}
                      </div>
                    )}
                    {fav.addedAt && (
                      <div className="favourite-job-added">
                        <span className="added-label">Added:</span>{" "}
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
            onPageChange={(page) => setSearchParams({ page: page.toString() })}
          />
        )}
      </div>
    </Container>
  );
}

export default FavouriteJobsView;
