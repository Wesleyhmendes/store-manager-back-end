const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');

describe('Realizando testes para listagem das vendas no service', function () {
  it('Listando todos as vendas com sucesso no service', async function () {
    sinon.stub(salesModel, 'findAllModel').resolves(allProductsModel);

    const findProducts = await salesService.getAllSalesService();

    expect(findProducts).to.be.an('array');
    expect(findProducts).to.be.deep.equal(allProductsModel);
  });

  it('Listando todos as vendas por id  no service', async function () {
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([producByIdModel]);

    const productId = 1;
    const findProductsById = await salesService.getSalesByIdService(productId);

    expect(findProductsById).to.be.an('array');
    expect(findProductsById).to.be.deep.equal([producByIdModel]);
  });

  it('Deve retornar 404 se o produto não existir  no service', async function () {
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([]);

    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesService.getSalesByIdService(req, res);

    expect(res.status.calledWith(404));
    expect(res.json.calledWith({ message: 'Product not found' }));
  });

  afterEach(function () {
    sinon.restore();
  });
});