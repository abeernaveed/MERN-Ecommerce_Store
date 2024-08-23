const express = require("express");

const productRouter = express.Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecificCategoryProduct,
} = require("./../controllers/productController");

productRouter.route("/").post(createProduct).get(getAllProducts);

productRouter
  .route("/:id")
  .get(getSpecificCategoryProduct)
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
