const Cart = require("../models/Cart.model");

async function getCartByUserId(userId) {
  return Cart.findOne({ user: userId }).populate("items.product");
}

async function addToCart({ userId, productId, quantity = 1 }) {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  return cart.save();
}

async function removeFromCart({ userId, productId }) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  cart.items = cart.items.filter((item) => !item.product.equals(productId));
  return cart.save();
}

async function clearCart(userId) {
  return Cart.findOneAndUpdate({ user: userId }, { items: [] }, { new: true });
}

module.exports = {
  getCartByUserId,
  addToCart,
  removeFromCart,
  clearCart,
};
