const express = require("express");

const inventoryRouter = express.Router();

const { getInventory } = require("./../controllers/inventoryController");

inventoryRouter.route("/").get(getInventory);

module.exports = inventoryRouter;
