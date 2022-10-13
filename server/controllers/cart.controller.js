const Cart = require("../models/cart.model");

const getCartProducts = (req, res) => {
  const user = req.user;
  console.log("cart");
  res.json({ message: req.user });
};

const addCartProducts = async (req, res) => {
  const user = req.user._id;
  let cartItems = [
    {
      name: "Chappals & Shoe Ladies Metallic",
      qty: "5",
      image: "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
      images: [
        "https://dummyjson.com/image/i/products/49/1.jpg",
        "https://dummyjson.com/image/i/products/49/2.jpg",
        "https://dummyjson.com/image/i/products/49/3.webp",
        "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
      ],
      price: "500",
      product: "6345790c55680d1146d2d92d",
    },
  ];
  const cart = new Cart({
    user,
    cartItems,
  });

  const createCart = await cart.save();
  console.log("cart");
  res.json({ message: createCart });
};

module.exports = {
  getCartProducts,
  addCartProducts,
};
