const productService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.getAllProducts();

  return res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);

  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product[0]);
};

module.exports = {
  getAllProducts,
  getProductById,
};