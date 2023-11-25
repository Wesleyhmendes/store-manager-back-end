module.exports = async (req, res, next) => {
  const newQuantity = req.body;

  console.log(newQuantity.quantity < 1);

  if (newQuantity.quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  if (newQuantity.quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};