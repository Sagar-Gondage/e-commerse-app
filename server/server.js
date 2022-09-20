const express = require("express");
const products = require("./data/products");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colrs = require("colors");

const allProducts = require("./routes/allProducts.route");
const singleProduct = require("./routes/singleProduct.route");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", allProducts);
app.use("/api/products", singleProduct);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.yellow.bold);
});
