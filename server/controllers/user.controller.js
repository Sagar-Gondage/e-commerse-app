const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const User = require("../models/user.model");

// user authentication
// public
// http://localhost:5000/api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Ivalid Email or password");
  }
  //   return res.json({ email, password });
});

module.exports = authUser;
