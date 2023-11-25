const allProductsModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const producByIdModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const newProduct = {
  id: 4,
  name: 'ProdutoX',
};

const updateProduct = {
  status: 200,
  data: {
    id: 1,
    name: 'Martelo do Batman',
  },
};

const productResolvedError = { message: 'Product not found' };

module.exports = {
  allProductsModel,
  producByIdModel,
  newProduct,
  updateProduct,
  productResolvedError,
};