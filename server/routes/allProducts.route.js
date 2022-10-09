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
  complecatedProducts,
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
router.route("/getproducts/api").post(complecatedProducts);

module.exports = router;
