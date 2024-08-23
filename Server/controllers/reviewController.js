const Review = require("./../models/reviewModel");
const Product = require("./../models/productModel");

exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment, userId } = req.body;
    // const userId = req.user.id; // Assuming user authentication

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    const savedReview = await review.save();

    // Update product with review reference
    product.reviews.push(savedReview._id);
    await product.save();

    res.status(201).json(savedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating review" });
  }
};
