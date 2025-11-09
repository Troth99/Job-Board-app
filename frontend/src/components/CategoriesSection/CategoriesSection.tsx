import { useState } from "react";

export default function CategoriesSection() {
const [categories, setCategories] = useState([]);

return (
      <div className="categories-section">
      <h2>Job Categories</h2>
      <div className="categories-grid">
      </div>
    </div>
)
}