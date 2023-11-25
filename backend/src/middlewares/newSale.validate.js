module.exports = async (req, res, next) => {
  const newSaleArray = req.body;

  const productIdError = newSaleArray.find((sale) => !sale.productId);
  const quantityIdError = newSaleArray.every((sale) => typeof sale.quantity !== 'undefined');
  const lowerQuantity = newSaleArray.find((sale) => sale.quantity <= 0);

  if (productIdError) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!quantityIdError) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  if (lowerQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};