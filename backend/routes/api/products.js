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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "687fec6a861cbe13d000a691"
 *                       code:
 *                         type: string
 *                         example: "P-1000"
 *                       name:
 *                         type: string
 *                         example: "Water Example"
 *                       description:
 *                         type: string
 *                         example: "By down threat voice onto answer rock."
 *                       image:
 *                         type: string
 *                         format: uri
 *                         example: "https://via.placeholder.com/300?text=Product+1"
 *                       category:
 *                         type: string
 *                         example: "Accessories"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 13.24
 *                       quantity:
 *                         type: integer
 *                         example: 85
 *                       internalReference:
 *                         type: string
 *                         example: "REF-30142"
 *                       shellId:
 *                         type: integer
 *                         example: 3
 *                       inventoryStatus:
 *                         type: string
 *                         example: "OUTOFSTOCK"
 *                       rating:
 *                         type: number
 *                         format: float
 *                         example: 3.7
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-21T21:08:45.502Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-21T21:08:45.502Z"
 *                 total:
 *                   type: integer
 *                   example: 60
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 6
 *       401:
 *         description: Unauthorized — Authentication failed or user not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
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
