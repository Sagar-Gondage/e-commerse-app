const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const checkPassword = require("../utils/checkPassword");
const generateToken = require("../utils/generateToken");

// user authentication
// public
// /api/users/login
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
// /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  // console.log("in resgiter");
  const { name, email, password } = req.body;

  if (name.length < 5) {
    return res
      .status(401)
      .json({ message: "name should be aleast 5 characters long" });
  }

  const isValidPassword = checkPassword(password);
  console.log("validPassword", isValidPassword);
  if (isValidPassword) {
    return res.status(401).json({ message: isValidPassword });
  }

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
// /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("in get uer Progile");
  const user = await User.findById(req.user._id);
  if (user) {
    // console.log("user", user);
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

// update user profile
// private route
// /api/users/profile
// we are calling decrypt in the model so password will automatically get decrypted
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("in update user Profile");
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }
  return res.json("error occured in put user profile");
});

// to get all the users from admin side
// private route and accesible by only admin
// /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// to delete a user
// private route and accesible by only admin
// /api/users/{id}
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User Deleted " });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// to get user by id
// private route and accesible by only admin
// /api/users
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

// update user by admin
// private route only admin can update the user
// /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  console.log("in update user");
  console.log(req.params.id);
  const user = await User.findById(req.params.id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return res.status(401).json({ message: "User Not Fouund" });
  }
  return res.json("error occured in put user profile");
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
