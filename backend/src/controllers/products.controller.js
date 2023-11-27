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

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const newName = req.body;
  const { name } = newName;

  const updateProduct = await productsService.updateProductService(id, name);
  const { status, data } = updateProduct;

  return res.status(status).json(data);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await productsService.deleteProductService(id);
  const { status, data } = deleteProduct;

  if (data) {
    return res.status(status).json(data);
  }
  
  return res.status(status).end();
};

const searchProductsController = async (req, res) => {
  const { q } = req.query;

  const products = await productsService.searchProductsService(q);
  const { status, data } = products;

  return res.status(status).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProductsController,
  updateProductController,
  deleteProductController,
  searchProductsController,
};