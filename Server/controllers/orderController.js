const Order = require("./../models/orderModel");
const Cart = require("./../models/cartModel");
const Inventory = require("./../models/inventoryModel");
const User = require("./../models/userModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress } = req.body; // Assuming user authentication

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate("cartItems");
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create order object
    const order = new Order({
      userId,
      orderItems: cart.cartItems,
      shippingAddress: shippingAddress,
      totalAmount: cart.totalPrice,
    });

    // Save the order
    const savedOrder = await order.save();

    // Update inventory
    for (const item of cart.cartItems) {
      const inventory = await Inventory.findOne({ productId: item.productId });
      console.log(inventory);
      if (inventory) {
        inventory.quantity -= item.quantity;
        await inventory.save();
      } else {
        console.log("Product not found in inventory:", item.productId);
      }
    }
    // Update user's orders array (Mongoose recommended approach)
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: savedOrder._id },
      },
      { new: true }
    ); // Return the updated user document

    // Clear the cart
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const features = new APIFeatures(
      Order.find({}).populate("userId"),
      req.query
    )
      .sort()
      .filter()
      .limitFields()
      .paginate();

    const orders = await features.query;
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
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
