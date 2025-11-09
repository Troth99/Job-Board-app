import { useEffect, useState } from "react";
import { Category, getAllCategories } from "../../services/categoryService";



export default function CategoriesSection()  {
  const [categories, setCategories] = useState<Category[]>([])
const [showAll, setShowAll] = useState(false);


 useEffect(() => {
    async function fetchCategories() {
        try {
            const data = await getAllCategories()
            setCategories(data)
        } catch (error) {
            console.error('Failed to load categories', error)
        }
    }
    fetchCategories();
 }, [])

  const visibleCategories = showAll ? categories : categories.slice(0, 8)
  return (
      <div className="categories-section">
      <h2>Job Categories</h2>
      <div className="categories-grid">
        {visibleCategories.map((cat) => (
            <div key={cat._id}>{cat.name}</div>
        ))}
      </div>

      {categories.length > 8 && (
        <button onClick={() => setShowAll(!showAll)} className="show-all-btn">
          {showAll ? "Show Less" : "Show All Categories"}
        </button>
      )}
    </div>
  );
}
