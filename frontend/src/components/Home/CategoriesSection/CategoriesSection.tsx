import "./categoriesSection.css";
import "./responsive.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { ShowMoreCategories } from "../../ShowMoreCategoriesOnHome/ShowMoreCategoriesOnhome";

export default function CategoriesSection() {
  const { categories: reduxCategories, showAll } = useSelector(
    (state: RootState) => state.categories
  );

  const [openModal, setOpenModal] = useState(false);

  const visibleCategories = showAll
    ? reduxCategories
    : reduxCategories.slice(0, 8);

  const handleCategoryClick = (cat: any) => {
    console.log("category clicked:", cat);
  };

  return (
    <div className="categories-section">
      <div className="categories-grid">
        {visibleCategories.map((cat) => (
          <div key={cat._id} className="category-card" onClick={() => handleCategoryClick(cat)}>
            <div className="card-body">
              <div className="one-line">
                <span>{cat.shortName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reduxCategories.length > 8 && (
        <button className="show-all-btn" onClick={() => setOpenModal(true)}>
          View All Categories
        </button>
      )}

 
      {openModal && (
        <div className="modal-overlay" onClick={() => setOpenModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ShowMoreCategories
              categories={reduxCategories}
              onClose={() => setOpenModal(false)}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
