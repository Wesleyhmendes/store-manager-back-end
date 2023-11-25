const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');
const { newSaleReturnMock, newSaleMock, newSaleMockIdError } = require('../../mocks/sales.mock');

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

  it('Listando vendas, mas deve retornar 404 se o produto não existir  no service', async function () {
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

  it('Inserindo uma nova venda no service', async function () {
    sinon.stub(salesModel, 'insertSalesModel').resolves(newSaleReturnMock);
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([true, true]);

    const result = await salesService.insertSalesService(newSaleMock);

    expect(result.status).to.be.equal(201);
    expect(result).to.be.deep.equal(newSaleReturnMock);
  });

  it('Inserindo uma nova venda no com productId inválido Service', async function () {
    const error = { status: 404, data: { message: 'Product not found' } };
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([]);

    const result = await salesService.insertSalesService(newSaleMockIdError);

    expect(result.status).to.be.equal(404);
    expect(result).to.be.deep.equal(error);
  });

  it('Deletando uma venda com sucesso no service', async function () {
    sinon.stub(salesModel, 'deleteSalesModel').resolves({ status: 204 });
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([
      {
        date: '2023 - 11 - 25T16:08: 29.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2023 - 11 - 25T16:08: 29.000Z',
        productId: 2,
        quantity: 10,
      },
    ]);

    const result = await salesService.deleteSalesService(1);

    expect(result.status).to.be.equal(204);
    expect(result).to.be.deep.equal({ status: 204 });
  });

  it('Deletando uma venda com id inválido no service', async function () {
    const error = { status: 404, data: { message: 'Sale not found' } };
    sinon.stub(salesModel, 'findSalesByIdModel').resolves([]);

    const result = await salesService.deleteSalesService(999);

    expect(result.status).to.be.equal(404);
    expect(result).to.be.deep.equal(error);
  });

  afterEach(function () {
    sinon.restore();
  });
});