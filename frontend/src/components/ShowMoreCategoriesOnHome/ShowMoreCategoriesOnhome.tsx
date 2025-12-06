
import "./ShowMoreCategories.css"
import { Category } from "../../hooks/useCategories";

type Props = {
  categories: any[];
  onClose: () => void;
  categoryHandler?: (cat: Category) => void;
};
export function ShowMoreCategories({categories, categoryHandler ,onClose }:  Props){
    
    return (
      <div className="overlay-categories-shown-home" onClick={onClose}>
        <div className="section-categories-shown-for-home" onClick={e => e.stopPropagation()}>
          <button className="btn-close-categories-shown-for-home" onClick={onClose}>×</button>
          <div className="categories-list-flex">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="category-card-flex"
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
    );
}