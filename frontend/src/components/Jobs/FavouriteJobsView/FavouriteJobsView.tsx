import { useEffect, useState } from "react";
import { useFavorites } from "../../../hooks/favorites";
import useCategories from "../../../hooks/useCategories";
import Spinner from "../../Spinner/Spinner";
import { Container } from "../../Container/Container";
import "./FavouriteJobsView.css";
import type { SavedJob } from "../../../context/FavouritesJobsContext";
import { useNavigate } from "react-router";

function FavouriteJobsView() {
  const [favoriteJobs, setFavoriteJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, string>>(
    {},
  );

  const { getAllFavoriteJobs } = useFavorites();
  const { getCategories } = useCategories();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [favRes, cats] = await Promise.all([
          getAllFavoriteJobs(),
          getCategories(),
        ]);
        const sortedJobs = favRes.savedJobs
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
          );
        setFavoriteJobs(sortedJobs);
        const map: Record<string, string> = {};
        cats.forEach((cat: any) => {
          map[cat._id] = cat.name;
        });
        setCategoriesMap(map);
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Removed unused fetchFavoriteJobs and unreachable loading code
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
              const categoryName = categoriesMap[job.category as string] || "-";
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
      </div>
    </Container>
  );
}

export default FavouriteJobsView;
