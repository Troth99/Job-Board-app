import "./FavoriteButton.css";
import { useFavoritesContext } from "../../../../context/FavouritesJobsContext";

export default function AddToFavourites({ jobId,  }: { jobId: string }) {
  const { isFavorite, addToFavorites, removeFromFavorites, loading, isLoggedIn } =
    useFavoritesContext();
  const saved = isFavorite(jobId);
  const isDisabled = loading || !isLoggedIn;
  const disabledTooltip = "You must log in to add this job in favourites";

  const handleClick = async () => {
    if (isDisabled) return;

    if (saved) {
      await removeFromFavorites(jobId);
    } else {
      await addToFavorites(jobId);
    }
  };
  return (
      <span
        style={{ cursor: isDisabled ? "not-allowed" : "default", display: "inline-block" }}
        title={!isLoggedIn ? disabledTooltip : undefined}
      >

    <button

      type="button"
      className={`favorite-button ${saved ? "active" : ""} ${loading ? "loading" : ""}`}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
      title={isLoggedIn ? (saved ? "Remove from favorites" : "Add to favorites") : undefined}
    >
      <span className="favorite-button-icon">{saved ? "♥" : "♡"}</span>
      <span className="favorite-button-text">
        {saved ? "In favorites" : "Add to favorites"}
      </span>
    </button>
      </span>
  );
}
