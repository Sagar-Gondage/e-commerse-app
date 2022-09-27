const express = require("express");

const { protect } = require("../middleware/auth.middleware");
const { addOrderItems } = require("../controllers/order.controller");

const router = express.Router();

router.route("/").post(protect, addOrderItems);

module.exports = router;
