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
  const { status, data } = insertSale;

  return res.status(status).json(data);
};

const deleteSalesController = async (req, res) => {
  const { id } = req.params;

  const deleteSales = await salesService.deleteSalesService(id);
  const { status, data } = deleteSales;

  if (data) {
    return res.status(status).json(data);
  }
  return res.status(status).end();
};

const updateSaleProductQuantity = async (req, res) => {
  const newQuantity = req.body;
  const { saleId, productId } = req.params;

  const result = await salesService
    .updateSaleProductQuantity(newQuantity.quantity, saleId, productId);
  const { status, data } = result;

  return res.status(status).json(data);
};

module.exports = {
  getAllSalesController,
  getSalesByIdController,
  insertSalesController,
  deleteSalesController,
  updateSaleProductQuantity,
};