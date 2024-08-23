const Inventory = require("./../models/inventoryModel");
const APIFeatures = require("../utils/apiFeatures");

// const Product = require("./../models/productModel");

exports.getInventory = async (req, res) => {
  try {
    const features = new APIFeatures(
      Inventory.find({}).populate("productId"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching inventory" });
  }
};
