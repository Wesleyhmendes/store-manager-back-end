const productModel = require('../models/products.model');

const getAllProducts = async () => {
  const allProducts = await productModel.findAllModel();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await productModel.findProductById(id);
  return product;
};

const insertProductsService = async (name) => {
  const newProduct = await productModel.insertProductsModel(name);

  return newProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProductsService,
};
