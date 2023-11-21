const productModel = require('../models/products.model');

const getAllProducts = async () => {
  const allProducts = await productModel.findAllModel();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await productModel.findProductById(id);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
