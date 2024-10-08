const User = require("./../models/userModel");
const express = require("express");
const app = express();
const APIFeatures = require("./../utils/apiFeatures");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

exports.create = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = await jwt.sign(
      { email: newUser.email, id: newUser._id },
      //   { id: newUser._id },

      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    //
    // Find Post by User and store in it
    res.cookie("token", token);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.logout = async (req, res, next) => {
  res.cookie("token", "");
  res.redirect("/login");
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
  const token = jwt.sign(
    { email: user.email, id: user._id },
    // { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.cookie("token", token);
  res.status(200).json({
    status: "success",
    token,
  });
};

//Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const features = new APIFeatures(
      User.find({}).populate("orders"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//Get Unique product
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//Update user
exports.updateUser = async (req, res) => {
  try {
    //better is to use create and save it, will do it later
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //To send back new data
      runValidators: true,
    });
    res.status(200).json({
      user,
      status: "success",
      message: "Updated the data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
//Delete user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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

//Protected Route
// exports.isLoggedIn = (req, res, next) => {
//   if (req.cookies.token === "") {
//     return res.redirect("/login");
//   } else {
//     let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
//     req.user = data;
//   }
// };
