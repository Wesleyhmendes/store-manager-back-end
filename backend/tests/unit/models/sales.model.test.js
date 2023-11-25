const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');
// const { newSaleMock, newSaleReturnMock } = require('../../mocks/sales.mock');

describe('Realizando testes para listagem das vendas no model', function () {
  it('Listando todos as vendas com sucesso no model', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsModel]);

    const findProducts = await salesModel.findAllModel();

    expect(findProducts).to.be.an('array');
    expect(findProducts).to.be.deep.equal(allProductsModel);
  });

  it('Listando todos as vendas por id no model', async function () {
    sinon.stub(connection, 'execute').resolves([[producByIdModel]]);

    const productId = 1;
    const findProductsById = await salesModel.findSalesByIdModel(productId);

    expect(findProductsById).to.be.an('array');
    expect(findProductsById).to.be.deep.equal([producByIdModel]);
  });

  

  afterEach(function () {
    sinon.restore();
  });
});
