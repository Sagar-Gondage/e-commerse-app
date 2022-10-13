const express = require("express");
const {
  getCartProducts,
  addCartProducts,
} = require("../controllers/cart.controller");

const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(protect, getCartProducts).post(protect, addCartProducts);
// router.route("/productcategory/:category/page/:pageNumber").post(getFilteredProducts)

module.exports = router;
