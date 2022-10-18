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
  // const { product } = newCartItem;
  console.log("in add to cart products", newCartItem);
  const { _id: userId } = req.user;
  const isUserinCart = await Cart.findOne({ user: userId });

  if (!isUserinCart) {
    const cart = new Cart({ user: userId, cartItems: newCartItem });
    const createdCart = await cart.save();
    res.json({ message: "Product added to cart", product: createdCart });
  } else {
    let { cartItems } = isUserinCart;

    let updatedCart;
    let updated;
    for (let i = 0; i < newCartItem.length; i++) {
      const isProductPresentInCart = cartItems.find(
        (item) => item.product == product
      );

      console.log("is product present in the cart", isProductPresentInCart);

      if (!isProductPresentInCart) {
        updatedCart = [...cartItems, newCartItem];
        // updated = await Cart.findOneAndUpdate(
        //   { user: userId },
        //   { cartItems: updatedCart }
        // );
        // console.log("added to cart", updatedCart);
        // res.json({ message: "new Product Added", newCartAdded: updated });
        // return;
      } else {
        updatedCart = cartItems.map((item) => {
          if (item.product == product) {
            item.qty = Number(item.qty) + Number(newCartItem.qty);
            return item;
          } else {
            return item;
          }
        });
      }

      updated = await Cart.findOneAndUpdate(
        { user: userId },
        { cartItems: updatedCart }
      );
    }
    console.log(updated);
    res.json({ message: "Product added to cart", data: updated });
  }
});

const updateCartProduct = asyncHandler(async (req, res) => {
  let newCartItem = req.body;

  console.log("in updateCartProducts", newCartItem);
  console.log(req.body);
  // const { product } = newCartItem;

  const { _id: userId } = req.user;

  const { cartItems } = await Cart.findOne({ user: userId });

  let updatedCart;
  for (let i = 0; i < newCartItem.length; i++) {
    let { qty: newCount, product } = newCartItem[i];
    console.log("new Product everyTime", newCount, product);
    updatedCart = cartItems.map((item) => {
      if (item.product == product) {
        item.qty = newCount;
        return item;
      } else {
        return item;
      }
    });
  }

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
