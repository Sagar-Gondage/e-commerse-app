const express = require("express");

const { protect } = require("../middleware/auth.middleware");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/order.controller");

const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
