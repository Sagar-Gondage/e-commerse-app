const Cart = require("../models/cart.model");
const asyncHandler = require("express-async-handler");

const getCartProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  let cartProducts = await Cart.findOne({ user: _id });
  // console.log("cart", cartProducts);
  res.json({ products: cartProducts.cartItems });
});

const addCartProducts = asyncHandler(async (req, res) => {
  let newCartItem = req.body;
  const { product } = newCartItem;
  console.log("in add to cart products", product);
  const { _id: userId } = req.user;
  const isUserinCart = await Cart.findOne({ user: userId });

  if (!isUserinCart) {
    const cart = new Cart({ user: userId, cartItems: newCartItem });
    const createdCart = await cart.save();
    res.json({ message: "Product added to cart", product: createdCart });
  } else {
    let { cartItems } = isUserinCart;

    const isProductPresentInCart = cartItems.find(
      (item) => item.product == product
    );

    console.log("is product present in the cart", isProductPresentInCart);

    if (!isProductPresentInCart) {
      const updatedCart = [...cartItems, newCartItem];
      const updated = await Cart.findOneAndUpdate(
        { user: userId },
        { cartItems: updatedCart }
      );
      console.log("added to cart", updatedCart);
      res.json({ message: "new Product Added", newCartAdded: updated });
      return;
    }

    const updatedCart = cartItems.map((item) => {
      if (item.product == product) {
        item.qty = Number(item.qty) + Number(newCartItem.qty);
        return item;
      } else {
        return item;
      }
    });

    const updated = await Cart.findOneAndUpdate(
      { user: userId },
      { cartItems: updatedCart }
    );
    res.json({ message: "Product added to cart", updated: updated });
  }
});

const updateCartProduct = asyncHandler(async (req, res) => {
  let { newCount, productId } = req.body;

  console.log("in updateCartProducts");
  console.log(req.body);
  // const { product } = newCartItem;

  const { _id: userId } = req.user;

  const { cartItems } = await Cart.findOne({ user: userId });

  const updatedCart = cartItems.map((item) => {
    if (item.product == productId) {
      item.qty = newCount;
      return item;
    } else {
      return item;
    }
  });
  console.log("updatedCart", updatedCart);
  const updated = await Cart.findOneAndUpdate(
    { user: userId },
    { cartItems: updatedCart }
  );
  res.json({ message: "Product added to cart", updated: updated });
});

module.exports = {
  getCartProducts,
  addCartProducts,
  updateCartProduct,
};
