const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();

  return res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);

  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product[0]);
};

const insertProductsController = async (req, res) => {
  const { name } = req.body;
  const insertProduct = await productsService.insertProductsService(name);

  return res.status(201).json(insertProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProductsController,
};