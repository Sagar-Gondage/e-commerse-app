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

// user user profile
// private route
// http://localhost:5000/api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
  return res.json("error occured in get user profile");
});

module.exports = { authUser, getUserProfile };
