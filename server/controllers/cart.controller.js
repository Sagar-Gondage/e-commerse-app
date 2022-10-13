const Cart = require("../models/cart.model");

const getCartProducts = (req, res) => {
  const user = req.user;
  console.log("cart");
  res.json({ message: req.user });
};

const addCartProducts = (req, res) => {
  const user = req.user._id;
  let cartItems = {
    _id: "6345790c55680d1146d2d92d",
    user: "6345790c55680d1146d2d921",
    name: "Chappals & Shoe Ladies Metallic",
    image: "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
    images: [
      "https://dummyjson.com/image/i/products/49/1.jpg",
      "https://dummyjson.com/image/i/products/49/2.jpg",
      "https://dummyjson.com/image/i/products/49/3.webp",
      "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
    ],
    brand: "Maasai Sandals",
    gender: "Womens",
    description:
      "Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals",
    size: ["Small", "Large"],
    rating: 4.72,
    numReviews: 3,
    price: 23,
    countInStock: 107,
    reviews: [],
    __v: 0,
    createdAt: "2022-10-11T14:09:16.571Z",
    updatedAt: "2022-10-11T14:09:16.571Z",
  };
  const cart = new Cart({
    user,
    cartItems,
  });

  const createCart = cart.save();
  console.log("cart");
  res.json({ message: createCart });
};

module.exports = {
  getCartProducts,
  addCartProducts,
};
