const salesService = require('../services/sales.service');

const getAllSalesController = async (_req, res) => {
  const allsales = await salesService.getAllSalesService();

  return res.status(200).json(allsales);
};

const getSalesByIdController = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSalesByIdService(id);

  if (!sales || sales.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sales);
};

const insertSalesController = async (req, res) => {
  const newSaleArray = req.body;
  const insertSale = await salesService.insertSalesService(newSaleArray);

  return res.status(201).json(insertSale);
};

module.exports = {
  getAllSalesController,
  getSalesByIdController,
  insertSalesController,
};