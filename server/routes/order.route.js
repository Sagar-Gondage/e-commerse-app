const express = require("express");

const { protect, isAdmin } = require("../middleware/auth.middleware");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} = require("../controllers/order.controller");

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
