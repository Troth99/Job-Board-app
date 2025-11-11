
import "./categoriesSection.css";
import "./responsive.css"
import { Category } from "../../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { setCategories } from "./categoriesSlice";

interface CategoriesSectionProps {
  categories: Category[]; 
}
export default function CategoriesSection({categories}: CategoriesSectionProps) {
  const dispatch = useDispatch();
 
  const { categories: reduxCategories, showAll } = useSelector((state: RootState) => state.categories); 

  useEffect(() => {
    if(reduxCategories.length === 0) {
      dispatch(setCategories(categories))
    }
  }, [categories, reduxCategories, dispatch])

  const visibleCategories = showAll ? categories : categories.slice(0, 8);
  return (
      <div className="categories-section">
      <div className="categories-grid">
        {visibleCategories.map((cat) => (
          <div key={cat._id}>
            <div className="card-body">
              <div className="one-line">
                <span>{cat.shortName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

  
      {categories.length > 8 && (
       
          <button className="show-all-btn">
            View All Categories
          </button>
    
      )}
    </div>
  );
}
