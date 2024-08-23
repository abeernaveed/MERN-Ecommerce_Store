const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
    // No need of this as it causes redundancy, we can get all data by just product table
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);
