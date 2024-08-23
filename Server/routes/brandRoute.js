const express = require("express");

const brandRouter = express.Router();

const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("./../controllers/brandController");

brandRouter.route("/").post(createBrand).get(getAllBrands);

brandRouter
  .route("/:id")
  .get(getBrandById)
  .patch(updateBrand)
  .delete(deleteBrand);

module.exports = brandRouter;
