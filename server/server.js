const express = require("express");
const products = require("./data/products");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((P) => P._id === id);
  res.json(product);
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
