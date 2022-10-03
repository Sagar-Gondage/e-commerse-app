const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect, isAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

module.exports = router;
