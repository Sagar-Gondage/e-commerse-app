const Cart = require("../models/cart.model");

const getCartProducts = async (req, res) => {
  const { _id } = req.user;
  // console.log("user", user)
  let cartProducts = await Cart.find({ user: _id });
  console.log("cart", cartProducts);
  res.json({ message: cartProducts });
};

const addCartProducts = async (req, res) => {
  let newCartItem = req.body;
  const { product } = newCartItem;

  const { _id: userId } = req.user;
  // console.log(newCartItem)
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
    // console.log("cartItems", cartItems);
    // console.log("isProductPresentInCart", isProductPresentInCart);

    if (!isProductPresentInCart) {
      console.log("in new product");
      console.log("cart Items", cartItems);
      console.log("newCartItem", newCartItem);
      const updatedCart = [...cartItems, newCartItem];
      console.log("updated cart", updatedCart);
      const updated = await Cart.findOneAndUpdate(
        { user: userId },
        { cartItems: updatedCart }
      );
      res.json({ message: "new Product Added", newCartAdded: updated });
      return;
    }

    const updatedCart = cartItems.map((item) => {
      if (item.product == product) {
        console.log("prev", item.qty);
        console.log("new", newCartItem.qty);
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
    // const cart = new Cart({ user: userId, cartItems: newCartItem });
    // const createdCart = await cart.save();
    res.json({ message: "Product added to cart", updated: updated });
  }

  // let { cartItems } = await Cart.findOne({ user: "6348254de266910d3c998f97" });
  // cartItems.push(newCartItems);
  // const cart = new Cart({
  //   user,
  //   cartItems,
  // });

  // const createCart = await cart.save();
  // console.log("cart");
  // res.json({ prev: createCart });
  // res.json({ message: "Hi" });
};

module.exports = {
  getCartProducts,
  addCartProducts,
};
