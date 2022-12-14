const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getCategoryProducts,
  getFilteredProducts,
} = require("../controllers/product.controller");
const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/product").get(getCategoryProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);
router.route("/getproducts/api").post(getFilteredProducts);
// router.route("/productcategory/:category/page/:pageNumber").post(getFilteredProducts)

module.exports = router;
