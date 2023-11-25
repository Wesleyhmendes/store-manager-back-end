const salesModel = require('../models/sales.model');

const getAllSalesService = async () => {
  const allSales = await salesModel.findAllModel();
  return allSales;
};

const getSalesByIdService = async (id) => {
  const sales = await salesModel.findSalesByIdModel(id);
  return sales;
};

const insertSalesService = async (newSaleArray) => {
  const validateSale = await Promise.all(newSaleArray.map(async (sale) => {
    const salesFound = await salesModel.findSalesByIdModel(sale.productId);
    return salesFound.length === 0;
  }));

  const validateError = validateSale.find((error) => error);

  if (validateError) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  const newSale = await salesModel.insertSalesModel(newSaleArray);
  return newSale;
};

const deleteSalesService = async (id) => {
  const validateSale = await salesModel.findSalesByIdModel(id);
  
  if (!validateSale.length) return { status: 404, data: { message: 'Sale not found' } };

  const deleteSale = await salesModel.deleteSalesModel(id);
  return deleteSale;
};

module.exports = {
  getAllSalesService,
  getSalesByIdService,
  insertSalesService,
  deleteSalesService,
};
