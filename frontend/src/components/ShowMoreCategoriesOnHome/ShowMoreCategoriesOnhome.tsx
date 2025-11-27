import "./ShowMoreCategories.css"

type Props = {
  categories: any[];
  onClose: () => void;
  onCategoryClick?: (cat: any) => void;
};
export function ShowMoreCategories({categories, onCategoryClick, onClose }:  Props){


    return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="all-categories-grid">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="category-card large"
              onClick={() => onCategoryClick(cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}