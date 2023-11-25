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

const updateProductService = async (id, name) => {
  const validateProduct = await productModel.findProductById(id);
  if (!validateProduct.length) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  const updateProduct = await productModel.updateProductModel(id, name);
  return updateProduct;
};

const deleteProductService = async (id) => {
  const validateProduct = await productModel.findProductById(id);
  if (!validateProduct.length) {
    return { status: 404, data: { message: 'Product not found' } };
  }
  const deleteProduct = await productModel.deleteProductModel(id);
  return deleteProduct;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProductsService,
  updateProductService,
  deleteProductService,
};
