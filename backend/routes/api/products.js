const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products.controller");
const requireAuth = require("../../middleware/auth");
const requireAdmin = require("../../middleware/requireAdmin");
const validateProduct = require("../../middleware/validators/product.validator");

router.use(requireAuth);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination and search
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default 10)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword (search by product name)
 *     responses:
 *       200:
 *         description: List of products
 */

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
