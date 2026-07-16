

import { Category } from "../../types/category";
import "./ShowMoreCategories.css"
import { useLingui } from "@lingui/react/macro";

type Props = {
  categories: Category[];
  onClose: () => void;
  categoryHandler?: (cat: Category) => void;
};
export function ShowMoreCategoriesOnhomeModal({categories, categoryHandler ,onClose }:  Props){
  const { i18n } = useLingui();
    
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
                {i18n.locale.startsWith("bg") ? cat.bgName || cat.name : cat.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}