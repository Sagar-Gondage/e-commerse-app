const express = require("express");
const {
  getRazorpayKey,
  createOrder,
  payOrder,
} = require("../controllers/razorpay.controller");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/get-razorpay-key").get(protect, getRazorpayKey);
router.route("/create-order").post(protect, createOrder);
router.route("/pay-order").post(protect, payOrder);

module.exports = router;
