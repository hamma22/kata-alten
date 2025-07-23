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

async function listProducts({ search, page, limit }) {
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (!page || !limit) {
    const products = await Product.find(query);
    return {
      products,
      total: products.length,
    };
  }

  const result = await Product.paginate(query, {
    page,
    limit,
  });

  return {
    products: result.docs,
    total: result.totalDocs,
    page: result.page,
    pages: result.totalPages,
  };
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
