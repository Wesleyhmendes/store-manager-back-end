const newSaleMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleMockIdError = [
  {
    productId: 123,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleNoIdMock = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleMockQuantityError = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleMockQuantityZeroError = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleReturnMock = {
  status: 201,
  data: {
    id: 6,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

const insertSaleMock = {
  status: 201,
  data: {
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

const updateSaleQuantityMock = {
  status: 200,
  data: {
    date: '2023-11-25T20:57:05.000Z',
    productId: 2,
    quantity: 20,
    saleId: 1,
  },
};

const errorSale = [
  {
    date: '2023-11-25T20:57:05.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-11-25T20:57:05.000Z',
    productId: 2,
    quantity: 20,
  },
];

const errorProduct = [{ id: 2, name: 'Traje de encolhimento' }];

module.exports = {
  newSaleMock,
  newSaleReturnMock,
  insertSaleMock,
  newSaleMockIdError,
  newSaleMockQuantityError,
  newSaleMockQuantityZeroError,
  newSaleNoIdMock,
  updateSaleQuantityMock,
  errorSale,
  errorProduct,
};