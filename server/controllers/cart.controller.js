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
  console.log("newCartItem", newCartItem);
  const { _id: userId } = req.user;
  const isUserinCart = await Cart.findOne({ user: userId });
  console.log("is user in cart", isUserinCart);

  if (!isUserinCart) {
    const cart = new Cart({ user: userId, cartItems: newCartItem });
    const createdCart = await cart.save();
    res.json({ message: "Product added to cart", product: createdCart });
  } else {
    console.log("add to cart in else part");
    let { cartItems } = isUserinCart;
    console.log("cartItems", cartItems);
    let updatedCart;
    let updated;
    for (let i = 0; i < newCartItem.length; i++) {
      // console.log("in looooopppp ", newCartItem);
      const { product } = newCartItem[i];
      const isProductPresentInCart = cartItems.find(
        (item) => item.product == product
      );

      console.log("is product present in the cart", isProductPresentInCart);

      if (!isProductPresentInCart) {
        console.log("cartItemsssss", cartItems);
        updatedCart = [...cartItems, newCartItem[i]];
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
            // item.qty = Number(item.qty) + Number(newCartItem[i].qty);
            item.qty = Number(newCartItem[i].qty);
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
    console.log("updated", updated);
    res.json({ message: "Product added to cart", data: updated });
  }
});

const addCartProductsUserLogin = asyncHandler(async (req, res) => {
  let newCartItem = req.body;
  // const { product } = newCartItem;
  // console.log("newCartItem", newCartItem);
  const { _id: userId } = req.user;
  const isUserinCart = await Cart.findOne({ user: userId });
  // console.log("is user in cart", isUserinCart);

  if (!isUserinCart) {
    const cart = new Cart({ user: userId, cartItems: newCartItem });
    const createdCart = await cart.save();
    res.json({ message: "Product added to cart", product: createdCart });
  } else {
    // console.log("add to cart in else part");
    let { cartItems } = isUserinCart;
    // console.log("cartItems", cartItems);
    let updatedCart;
    let updated;

    let check = cartItems.find((el) => el.product == newCartItem.product);
    // console.log("CHECK", check);
    if (check === undefined) {
      updatedCart = [...cartItems, newCartItem];
    }

    updated = await Cart.findOneAndUpdate(
      { user: userId },
      { cartItems: updatedCart }
    );
    res.json({ message: "Product added to cart", data: updated });
  }
});

const deleteCartProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const { _id: userId } = req.user;
  const { cartItems } = await Cart.findOne({ user: userId });
  console.log("userinCart", cartItems);

  let updatedCart = cartItems.filter((el) => el.product != productId);

  console.log("updated", updatedCart);

  updated = await Cart.findOneAndUpdate(
    { user: userId },
    { cartItems: updatedCart }
  );
  res.json({ message: "Product added to cart", data: updated });
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
  deleteCartProduct,
  updateCartProduct,
  addCartProductsUserLogin,
};
