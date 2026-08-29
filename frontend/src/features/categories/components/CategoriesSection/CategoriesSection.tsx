import "./categoriesSection.css";
import "./responsive.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../../../../store/store";
import { Category } from "../../types/category";
import { ShowMoreCategoriesOnhomeModal } from "../ShowMoreCategoriesOnHomeModal/ShowMoreCategoriesOnhomeModal";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react/macro";


export default function CategoriesSection() {
  const { i18n } = useLingui();
  const { categories: reduxCategories, showAll } = useSelector(
    (state: RootState) => state.categories
  );

  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);

  const visibleCategories = showAll
    ? reduxCategories
    : reduxCategories.slice(0, 8);

const handleCategoryClick = (cat: Category) => {
  const categoryName = encodeURIComponent(cat.name)
  navigate(`/category/${categoryName}`); 
};

  return (
    
    <div className="custom-categories-section">
      <h2 className="custom-categories-title"><Trans>Browse by Category</Trans></h2>
      <div className="custom-categories-grid">
        {visibleCategories.map((cat) => (
          <button
            key={cat.name}
            type="button"
            className="custom-category-card"
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="custom-card-body">
              <div className="custom-one-line">
                <span>{i18n.locale.startsWith("bg") ? cat.bgName || cat.name : cat.name}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {reduxCategories.length > 8 && (
        <div className="custom-categories-actions">
          <button className="custom-show-all-btn" onClick={() => setOpenModal(true)}>
            <Trans>View All Categories</Trans>
          </button>
        </div>
      )}

 
      {openModal && (
        <div  onClick={() => setOpenModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ShowMoreCategoriesOnhomeModal
              categories={reduxCategories}
              onClose={() => setOpenModal(false)}
              categoryHandler={handleCategoryClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
