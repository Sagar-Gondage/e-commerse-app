const express = require("express");
const Product = require("../models/product.model");

const authUser = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(authUser);

module.exports = router;
