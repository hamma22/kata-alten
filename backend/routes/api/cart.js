const express = require("express");
const router = express.Router();
const requireAuth = require("../../middleware/auth");

const cartController = require("../../controllers/cart.controller");

router.use(requireAuth);

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.post("/clear", cartController.clearCart);

module.exports = router;

module.exports = router;
