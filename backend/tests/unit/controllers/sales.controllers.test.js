const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes para listagem das vendas no controller', function () {
  it('Listando todos as vendas com sucesso no controller', async function () {
    sinon.stub(salesService, 'getAllSalesService').resolves([allProductsModel]);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSalesController(null, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos as vendas por id no controller', async function () {
    sinon.stub(salesService, 'getSalesByIdService').resolves([producByIdModel]);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos as vendas com id inválido', async function () {
    sinon.stub(salesService, 'getSalesByIdService').resolves([]);

    const req = { params: { id: 123 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  afterEach(function () {
    sinon.restore();
  });
});