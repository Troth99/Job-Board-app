import { useState } from "react";
import "./FavoriteButton.css";


export default function AddToFavourites() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
  <button
    type="button"
    className={`favorite-button ${isFavorite ? "active" : ""}`}
    onClick={() => setIsFavorite((prev) => !prev)}
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
  >
    <span className="favorite-button-icon">
      {isFavorite ? "♥" : "♡"}
    </span>
    <span className="favorite-button-text">
      {isFavorite ? "In favorites" : "Add to favorites"}
    </span>
  </button>
    )
}