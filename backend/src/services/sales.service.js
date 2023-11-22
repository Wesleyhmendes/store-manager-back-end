const salesModel = require('../models/sales.model');

const getAllSalesService = async () => {
  const allSales = await salesModel.findAllModel();
  return allSales;
};

const getSalesByIdService = async (id) => {
  const sales = await salesModel.findSalesByIdModel(id);
  return sales;
};

module.exports = {
  getAllSalesService,
  getSalesByIdService,
};
