import "./FavoriteButton.css";
import { useFavoritesContext } from "../../../../context/FavouritesJobs";

export default function AddToFavourites({ jobId }: { jobId: string }) {
  const { isFavorite, addToFavorites, removeFromFavorites, loading } =
    useFavoritesContext();
  const saved = isFavorite(jobId);

  const handleClick = async () => {
    if (saved) {
      await removeFromFavorites(jobId);
    } else {
      await addToFavorites(jobId);
    }
  };
  return (
      <span style={{ cursor: loading ? "not-allowed" : "default", display: "inline-block" }}>

    <button
      type="button"
      className={`favorite-button ${saved ? "active" : ""} ${loading ? "loading" : ""}`}
      onClick={handleClick}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
      title={saved ? "Remove from favorites" : "Add to favorites"}
    >
      <span className="favorite-button-icon">{saved ? "♥" : "♡"}</span>
      <span className="favorite-button-text">
        {saved ? "In favorites" : "Add to favorites"}
      </span>
    </button>
      </span>
  );
}
