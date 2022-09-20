const express = require("express");
const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");

const singleProduct = express.Router();

// get single proudcts
singleProduct.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);

    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  })
);

module.exports = singleProduct;
