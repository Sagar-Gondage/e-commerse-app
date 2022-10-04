const express = require("express");
const path = require("path");
const products = require("./data/products");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colrs = require("colors");

const allProducts = require("./routes/allProducts.route");
const userRoutes = require("./routes/user.route");
const orderRoutes = require("./routes/order.route");
const uploadRoutes = require("./routes/upload.routes");

const singleProduct = require("./routes/singleProduct.route");
const { notFound, errorHandler } = require("./middleware/error.middleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/products", allProducts);
// app.use("/api/products", singleProduct);
app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// out uploads foler is not accesible by default so to access it we have to make it a static folder
// __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.yellow.bold);
});
