const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const Product = require("../models/product.model");

const OrderSchema = mongoose.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});

const Order = mongoose.model("OrderPay", OrderSchema);

const getRazorpayKey = asyncHandler(async (req, res) => {
  console.log("in get key route");
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

const createOrder = asyncHandler(async (req, res) => {
  console.log("in create route");
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

const payOrder = asyncHandler(async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = {
  getRazorpayKey,
  createOrder,
  payOrder,
};
