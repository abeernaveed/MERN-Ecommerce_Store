const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();

// For auth, we skip rest pattern
userRouter.route("/create").post(userController.create);
userRouter.route("/logout").get(userController.logout);
userRouter.route("/login").post(userController.login);

userRouter.route("/").get(userController.getAllUsers);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);
module.exports = userRouter;
