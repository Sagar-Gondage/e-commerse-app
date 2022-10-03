const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const img =
  "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
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

// create product
// private route and only acceessible by admin
// http://localhost:5000/api/products/create
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: img,
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// updated product
// private route and only acceessible by admin
// http://localhost:5000/api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Produt not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
