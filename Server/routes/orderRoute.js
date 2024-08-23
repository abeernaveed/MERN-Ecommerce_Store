const express = require("express");

const orderRouter = express.Router();

const {
  createOrder,
  getOrder,
  deleteOrder,
} = require("./../controllers/orderController");

orderRouter.route("/").post(createOrder).get(getOrder);
orderRouter.route("/:id").delete(deleteOrder);

module.exports = orderRouter;
