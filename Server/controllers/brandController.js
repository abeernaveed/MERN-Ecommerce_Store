const Brand = require("./../models/brandModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const features = new APIFeatures(Brand.find({}), req.query)
      .sort()
      .filter()
      .limitFields()
      .paginate();

    const brands = await features.query;
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: message.err });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
