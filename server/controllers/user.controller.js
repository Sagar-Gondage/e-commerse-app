const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

// user authentication
// public
// http://localhost:5000/api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // matchpassword function is in user.model file
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Ivalid Email or password");
  }
  //   return res.json({ email, password });
});

// new user registration
// public
// http://localhost:5000/api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  // password hashing is done in user.model
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// user user profile
// private route
// http://localhost:5000/api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  // console.log("in get uer Progile");
  const user = await User.findById(req.user._id);
  if (user) {
    console.log("user", user);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }
  // return res.json("error occured in get user profile");
});

module.exports = { authUser, getUserProfile, registerUser };
