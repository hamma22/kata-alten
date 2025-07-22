const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products.controller");
const requireAuth = require("../../middleware/auth");
const requireAdmin = require("../../middleware/requireAdmin");
const validateProduct = require("../../middleware/validators/product.validator");

router.use(requireAuth);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post(
  "/",
  validateProduct,
  requireAdmin,
  productController.createProduct
);
router.patch("/:id", requireAdmin, productController.updateProduct);
router.delete("/:id", requireAdmin, productController.deleteProduct);

module.exports = router;
