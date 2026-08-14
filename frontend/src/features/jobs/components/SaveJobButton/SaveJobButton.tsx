import { useFavoritesContext } from "../../../../context/FavouritesJobsContext";
import "./SaveJobButton.css";
import {t} from "@lingui/core/macro"


export default function AddToFavourites({ jobId,  }: { jobId: string }) {
  const { isFavorite, addToFavorites, removeFromFavorites, loading, isLoggedIn } =
    useFavoritesContext();
  const saved = isFavorite(jobId);
  const isDisabled = loading || !isLoggedIn;
  const disabledTooltip = t`You must log in to add this job in favourites`;

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
        style={{ cursor: isDisabled ? t`not-allowed` : "default", display: "inline-block" }}
        title={!isLoggedIn ? disabledTooltip : undefined}
      >

    <button

      type="button"
      className={`favorite-button ${saved ? "active" : ""} ${loading ? "loading" : ""}`}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={saved ? t`Remove from favorites` : t`Add to favorites`}
      title={isLoggedIn ? (saved ? t`Remove from favorites` : t`Add to favorites`) : undefined}
    >
      <span className="favorite-button-icon">{saved ? "♥" : "♡"}</span>
      <span className="favorite-button-text">
        {saved ? t`In favorites` : t`Add to favorites`}
      </span>
    </button>
      </span>
  );
}
