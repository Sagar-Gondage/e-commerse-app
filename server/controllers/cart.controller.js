const Cart = require("../models/cart.model");

const getCartProducts = async (req, res) => {
  const user = req.user;
  let cartProducts = await Cart.find();
  console.log("cart");
  res.json({ message: cartProducts });
};

const addCartProducts = async (req, res) => {
  const user = req.user._id;
  //   let cartItems = [
  //     {
  //       name: "Chappals & Shoe Ladies Metallic",
  //       qty: "5",
  //       image: "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
  //       images: [
  //         "https://dummyjson.com/image/i/products/49/1.jpg",
  //         "https://dummyjson.com/image/i/products/49/2.jpg",
  //         "https://dummyjson.com/image/i/products/49/3.webp",
  //         "https://dummyjson.com/image/i/products/49/thumbnail.jpg",
  //       ],
  //       price: "500",
  //       product: "6345790c55680d1146d2d92d",
  //     },
  //   ];
  let newCartItems = req.body.newCartItems;
  let { cartItems } = await Cart.findOne({ user: "6348254de266910d3c998f97" });
  cartItems.push(newCartItems);
  const cart = new Cart({
    user,
    cartItems,
  });

  const createCart = await cart.save();
  console.log("cart");
  res.json({ prev: createCart });
};

module.exports = {
  getCartProducts,
  addCartProducts,
};
