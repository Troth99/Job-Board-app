import Category from "../models/Category.js"


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}