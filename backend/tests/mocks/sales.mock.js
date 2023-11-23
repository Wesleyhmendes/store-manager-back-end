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

module.exports = {
  newSaleMock,
  newSaleReturnMock,
  insertSaleMock,
};