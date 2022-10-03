const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/product.controller");
const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

module.exports = router;
