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
  const newSale = await salesModel.insertSalesModel(newSaleArray);

  return newSale;
};

module.exports = {
  getAllSalesService,
  getSalesByIdService,
  insertSalesService,
};
