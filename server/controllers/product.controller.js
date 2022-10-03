const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");

// it will fetch all products
// public
// http://localhost:5000/api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// get single proudcts
// private route
// http://localhost:5000/api/products/6326eb46a6a6e4ceca79c4a4
const getProductById = asyncHandler(async (req, res) => {
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
});

// delete single product
// private route and only acceessible by admin
// http://localhost:5000/api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const product = await Product.findById(id);

  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    // below two lines can only be used if you have the error middleware setup
    res.status(404);
    throw new Error("Produti not found");

    // else you have to use below format
    // return res.status(404).json({ message: "Product not found" });
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
};
