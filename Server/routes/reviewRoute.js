const express = require("express");

const reviewRouter = express.Router();

const { createReview } = require("./../controllers/reviewController");

reviewRouter.route("/").post(createReview);

module.exports = reviewRouter;
