const Category = require("../models/CategoryModel");
const connectToDatabase = require("../lib/mongodb");

async function createCategory(req, res) {
  await connectToDatabase();
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Error creating category" });
  }
}

async function updateCategory(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.query;
    const { name } = req.body;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    existingCategory.name = name;
    const updatedCategory = await existingCategory.save();

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Error updating category" });
  }
}

async function deleteCategory(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.query;
    await Category.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Error deleting category" });
  }
}

async function getCategory(req, res) {
  await connectToDatabase();
  try {
    const { id } = req.query;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ error: "Error fetching category" });
  }
}

async function getAllCategories(req, res) {
  await connectToDatabase();
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Error fetching categories" });
  }
}

module.exports = {
  getAllCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
};
