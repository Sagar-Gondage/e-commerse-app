const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");

// it will create new order
// private & Post
// http://localhost:5000/api/orders
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
// http://localhost:5000/api/orders
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

module.exports = { addOrderItems, getOrderById };
