const logger = require("../config/logger");
const cartService = require("../services/cart.services");

async function getCart(req, res) {
  try {
    const cart = await cartService.getCartByUserId(req.user._id);
    logger.info(`Fetched cart for user ${req.user._id}`);
    res.json(cart || { items: [] });
  } catch (err) {
    logger.error("Error fetching cart:", err);
    res.status(500).json({ error: err.message });
  }
}

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  try {
    const updatedCart = await cartService.addToCart({
      userId: req.user._id,
      productId,
      quantity,
    });
    logger.info(`Added product ${productId} to cart for user ${req.user._id}`);
    res.json(updatedCart);
  } catch (err) {
    logger.error("Error adding to cart:", err);
    res.status(500).json({ error: err.message });
  }
}

async function removeFromCart(req, res) {
  const { productId } = req.body;
  try {
    const updatedCart = await cartService.removeFromCart({
      userId: req.user._id,
      productId,
    });
    logger.info(
      `Removed product ${productId} from cart for user ${req.user._id}`
    );
    res.json(updatedCart);
  } catch (err) {
    logger.error("Error removing from cart:", err);
    res.status(500).json({ error: err.message });
  }
}

async function clearCart(req, res) {
  try {
    const clearedCart = await cartService.clearCart(req.user._id);
    logger.info(`Cleared cart for user ${req.user._id}`);
    res.json(clearedCart);
  } catch (err) {
    logger.error("Error clearing cart:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
