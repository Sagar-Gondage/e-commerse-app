const express = require("express");
const Product = require("../models/product.model");

const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");
const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

module.exports = router;
