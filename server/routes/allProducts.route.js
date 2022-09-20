const express = require("express");
const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");

const allProducts = express.Router();

// it will fetch all products
// public
// http://localhost:5000/api/products
allProducts.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log("all");
    const products = await Product.find();
    res.json(products);
  })
);

module.exports = allProducts;
