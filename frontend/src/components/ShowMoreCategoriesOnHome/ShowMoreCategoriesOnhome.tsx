
import "./ShowMoreCategories.css"
import { Category } from "../../hooks/useCategories";

type Props = {
  categories: any[];
  onClose: () => void;
  categoryHandler?: (cat: Category) => void;
};
export function ShowMoreCategories({categories, categoryHandler ,onClose }:  Props){
    
    return (
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="all-categories-grid">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="category-card large"
              onClick={() => {
                categoryHandler?.(cat); 
                onClose(); 
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}