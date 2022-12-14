const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const img =
  "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
// it will fetch all products
// public
// /api/products
const getProducts = asyncHandler(async (req, res) => {
  console.log("in getProducts");

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  console.log("query", req.query.keyword);
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};
  // console.log({ ...keyword });
  const count = await Product.countDocuments({ ...keyword });
  // console.log(count);
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// get category products
// public
// /api/products/product/productcategory?mens
// this below login can be done in getall product as well but for simplicity its here
const getCategoryProducts = asyncHandler(async (req, res) => {
  console.log("in getCategoryProducts");

  const { productcategory } = req.query;
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({
    category: req.query.productcategory,
  });
  console.log(productcategory);
  if (productcategory === "allproducts") {
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    const products = await Product.find({ category: productcategory })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    // const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});

const getFilteredProducts = asyncHandler(async (req, res) => {
  console.log("in get filteredProducts");
  console.log("filteredProducts", req.body.gender);
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  // const count = await Product.countDocuments({
  //   category: req.query.productcategory,
  // });
  if (req.body.gender === "Mens" || req.body.gender === "mens") {
    req.body.gender = "Male";
  }
  if (req.body.gender === "Womens" || req.body.gender === "womens") {
    req.body.gender = "Womens";
  }
  if (req.body.gender === "allproducts") {
    req.body.gender = "";
  }
  const {
    description = "",
    gender = "",
    lowPrice = 0,
    highPrice = 1000,
    size = "",
  } = req.body;

  try {
    console.log("intry");
    console.log(description, gender);
    const products = await Product.find({
      description: { $regex: description },
      gender: { $regex: gender },
      price: { $gt: lowPrice, $lt: highPrice },
      size: { $regex: size },
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    console.log("products", products.length);
    let count = products.length;
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.json({ message: error });
  }
});

// get single proudcts
// private route
// /api/products/6326eb46a6a6e4ceca79c4a4
const getProductById = asyncHandler(async (req, res) => {
  console.log("in getProductById");

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
// /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  console.log("in deleteProduct");

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
// /api/products/create
const createProduct = asyncHandler(async (req, res) => {
  console.log("in createProduct");

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
// /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  console.log("in updateProduct");

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

// updated product review
// private && admin and user can access
// /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  console.log("in createProductReview");
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((sum, item) => item.rating + sum, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "New Review Added" });
  } else {
    res.status(404);
    throw new Error("Produt not found");
  }
});

// get top rated products
// public
// /api/products/top
// this below login can be done in getall product as well but for simplicity its here
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

module.exports = {
  getProducts,
  getCategoryProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getFilteredProducts,
};
