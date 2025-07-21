const Product = require("../models/Product.model");

async function findProductById(id) {
  return Product.findById(id);
}

async function updateProduct({ id, updateData }) {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return product;
}

async function listProducts() {
  return Product.find();
}

async function deleteProduct(id) {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  await product.remove();
  return product;
}

async function createProduct(productData) {
  const newProduct = new Product(productData);
  return await newProduct.save();
}

module.exports = {
  findProductById,
  updateProduct,
  listProducts,
  deleteProduct,
  createProduct,
};
