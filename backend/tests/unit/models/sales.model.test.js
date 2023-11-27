const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');
const { newSaleMock } = require('../../mocks/sales.mock');

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

  it('Cadastrando uma nova venda com sucesso no model', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 4 }])
      .onSecondCall()
      .resolves([]);

    const result = await salesModel.insertSalesModel(newSaleMock);

    const expectedStatus = 201;
    const expectedData = { id: 4, itemsSold: newSaleMock };

    expect(result.status).to.be.equal(expectedStatus);
    expect(result.data).to.be.deep.equal(expectedData);
  });

  it('Deletando uma venda com sucesso no model', async function () {
    sinon.stub(connection, 'execute').resolves({ status: 204 });

    const id = 1;
    const result = await salesModel.deleteSalesModel(id);

    expect(result.status).to.be.equal(204);
  });

  it('Editando a quantidade de uma venda com sucesso no model', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.updateSaleProductQuantityModel(15, 1, 2);

    expect(result.status).to.be.equal(200);
  });

  afterEach(function () {
    sinon.restore();
  });
});
