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

const deleteSalesService = async (id) => {
  const deleteSales = await salesModel.deleteSalesModel(id);

  return deleteSales;
};

module.exports = {
  getAllSalesService,
  getSalesByIdService,
  insertSalesService,
  deleteSalesService,
};
