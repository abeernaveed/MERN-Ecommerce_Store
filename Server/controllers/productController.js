const Product = require("./../models/productModel");
const Category = require("./../models/categoryModel");
const Brand = require("./../models/brandModel");
const APIFeatures = require("../utils/apiFeatures");
const Inventory = require("./../models/inventoryModel");
//Get ALl Products
exports.getAllProducts = async (req, res) => {
  try {
    const features = new APIFeatures(
      Product.find({}).populate("brandId").populate("categoryId"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//Get Unique product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      categoryId,
      quantity,
      brandId,
      sku,
      isActive,
    } = req.body;

    // Validate categoryId and brandId existence
    const category = await Category.findById(categoryId);
    if (!category) {
      console.log(category);
      return res.status(400).json({ error: "Category not found" });
    }

    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(400).json({ error: "Brand not found" });
    }

    const product = new Product({
      name,
      description,
      price,
      images,
      quantity,
      categoryId,
      brandId,
      sku,

      isActive,
    });

    const savedProduct = await product.save();

    // Add them in inventory
    // Create inventory record
    const inventory = new Inventory({
      productId: savedProduct._id,
      quantity: product.quantity || 0,
    });
    await inventory.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//Update product
exports.updateProduct = async (req, res) => {
  try {
    //better is to use create and save it, will do it later
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //To send back new data
      runValidators: true,
    });
    res.status(200).json({
      product,
      status: "success",
      message: "Updated the data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
//Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getSpecificCategoryProduct = async (req, res) => {
  try {
    const products = await Product.find({
      categoryId: req.params.category,
    });
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
