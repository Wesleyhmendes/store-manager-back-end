const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { 
  allProductsModel, producByIdModel,
} = require('../../mocks/products.mock');
const { insertSaleMock, updateSaleQuantityMock } = require('../../mocks/sales.mock');

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

  it('Cadastrando vendas no controllers', async function () {
    sinon.stub(salesService, 'insertSalesService').resolves(insertSaleMock);

    const req = { body: insertSaleMock };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it('Deletando vendas no controllers', async function () {
    sinon.stub(salesService, 'deleteSalesService').resolves({ status: 204 });

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };

    await salesController.deleteSalesController(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Deletando vendas no controllers com venda inválida', async function () {
    sinon.stub(salesService, 'deleteSalesService')
      .resolves({ status: 404, data: { message: 'Sale not found' } });

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(),
    };

    await salesController.deleteSalesController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Atualizando quantidade de produtos de uma venda no controller', async function () {
    sinon.stub(salesService, 'updateSaleProductQuantity').resolves(updateSaleQuantityMock);
    const req = { params: { saleId: 1, productId: 2 }, body: { quantity: 5 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateSaleProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateSaleQuantityMock.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});