import { useEffect, useState } from "react";
import { Category, getAllCategories } from "../../services/categoryService";
import "./categoriesSection.css";
import "./responsive.css"

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    }
    fetchCategories();
  }, []);

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
