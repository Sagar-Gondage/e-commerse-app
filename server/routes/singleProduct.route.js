const express = require("express");
const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");

const singleProduct = express.Router();

// get single proudcts
// private route
// http://localhost:5000/api/products/6326eb46a6a6e4ceca79c4a4
singleProduct.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const product = await Product.findById(id);

    if (product) {
      return res.json(product);
    } else {
      // below two lines can only be used if you have the error middleware setup
      res.status(404);
      throw new Error("Produti not found");

      // else you have to use below format
      // return res.status(404).json({ message: "Product not found" });
    }
  })
);

module.exports = singleProduct;
