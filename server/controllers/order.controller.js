const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");

// it will create new order
// private & Post
// /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = req.user._id;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
  res.json(products);
});

// it will get order by id
// private & get
// /api/orders/6333188b163c0b2001d503ee
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // console.log("get Order", order);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// it will update order to paid
// private & get
// /api/orders/6333188b163c0b2001d503ee
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      razorpayPaymentId: req.body.razorpayPaymentId,
      razorpayOrderId: req.body.razorpayOrderId,
      razorpaySignature: req.body.razorpaySignature,
      // status: req.body.status,
      // update_time: req.body.update_time,
      // email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// it will update order to our for delivery. Only Admin can Access
// private & get
// /api/orders/6333188b163c0b2001d503ee
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// it will get logged in user orders
// private & get
// /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// get all orders, accesible by admin only
// private & get
// /api/orders/myorders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
