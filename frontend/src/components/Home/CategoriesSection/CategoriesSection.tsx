
import "./categoriesSection.css";
import "./responsive.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../redux/store";
import { useEffect, useState } from "react";
import { setCategories } from "./categoriesSlice";


export default function CategoriesSection() {

  const dispatch = useDispatch();
 
  const { categories: reduxCategories, showAll } = useSelector((state: RootState) => state.categories); 

  if (reduxCategories.length === 0) {
    return <div>Loading...</div>; 
  }

  const visibleCategories = showAll ? reduxCategories : reduxCategories.slice(0, 8);
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

  
      {reduxCategories.length > 8 && (
       
          <button className="show-all-btn">
            View All Categories
          </button>
    
      )}
    </div>
  );
}
