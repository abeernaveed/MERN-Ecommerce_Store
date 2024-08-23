const express = require("express");
const messageRouter = express.Router();
const {
  createMessage,
  getMessage,
  deleteMessage,
} = require("../controllers/messageController");

messageRouter
  .post("/", createMessage)
  .get("/", getMessage)
  .delete("/:id", deleteMessage);

module.exports = messageRouter;
