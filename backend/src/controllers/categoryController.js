import Category from "../models/Category.js"


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        console.log(req.body)
        const  { categoryId }  = req.body;
     console.log(categoryId)

  
        if (!categoryId) {
            return res.status(400).json({ message: "Category ID is required" });
        }

        const trimmedId = categoryId.trim();

        if (!trimmedId) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const category = await Category.findById(trimmedId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};