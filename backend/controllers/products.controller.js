const logger = require("../config/logger");
const productService = require("../services/products.services");

// GET /products
async function getProducts(req, res) {
  try {
    const products = await productService.listProducts();
    logger.info("Fetched products successfully");
    res.json(products);
  } catch (err) {
    logger.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET /products/:id
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await productService.findProductById(id);
    if (!product) {
      logger.warn(`Product with ID ${id} not found`);
      return res.status(404).json({ error: "Product not found" });
    }
    logger.info(`Fetched product with ID ${id} successfully`);
    res.json(product);
  } catch (err) {
    logger.error("Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
}

// POST /products
async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    logger.info("Created new product successfully");
    res.status(201).json(newProduct);
  } catch (err) {
    logger.error("Error creating product:", err);
    res.status(400).json({ error: err.message });
  }
}

// PUT /products/:id
async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedProduct = await productService.updateProduct({
      id,
      updateData,
    });
    if (!updatedProduct) {
      logger.warn(`Product with ID ${id} not found`);
      return res.status(404).json({ error: "Product not found" });
    }
    logger.info(`Updated product with ID ${id} successfully`);
    res.json(updatedProduct);
  } catch (err) {
    logger.error("Error updating product:", err);
    res.status(500).json({ error: err.message });
  }
}

// DELETE /products/:id
async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteProduct(id);
    logger.info(`Deleted product with ID ${id} successfully`);
    res.json(deletedProduct);
  } catch (err) {
    logger.error("Error deleting product:", err);
    if (err.message === "Product not found") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
