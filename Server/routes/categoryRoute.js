const express = require("express");

const categoryRouter = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./../controllers/categoryController");

categoryRouter.route("/").post(createCategory).get(getAllCategories);

categoryRouter
  .route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = categoryRouter;
