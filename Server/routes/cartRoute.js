const express = require("express");

const cartRouter = express.Router();

const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("./../controllers/cartController");

cartRouter.route("/").post(addToCart);
cartRouter.route("/:userId").get(getCartItems);
cartRouter.route("/:userId/:productId").delete(removeFromCart);

module.exports = cartRouter;
