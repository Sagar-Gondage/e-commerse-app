const express = require("express");
const Product = require("../models/product.model");

const {
  authUser,
  getUserProfile,
  registerUser,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
