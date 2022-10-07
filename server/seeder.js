const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
// const products = require("./data/products");
const products = require("./practice");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProduts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduts);

    console.log("data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// check package json for args commands

// run "npm run data:import" to push the custom products data to mongodb

// run "npm run data:destroy" to destroy all current data

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
