const express = require("express");
const Product = require("../models/product.model");

const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);

module.exports = router;
