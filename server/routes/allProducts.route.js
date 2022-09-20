const express = require("express");
const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const {
  getProducts,
  getProductById,
} = require("../controllers/product.controller");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

module.exports = router;
