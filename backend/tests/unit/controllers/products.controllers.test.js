const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { products } = require('../../../src/services');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes para listagem dos produtos no controller', function () {
  it('Listando todos os produtos com sucesso no controller', async function () {
    sinon.stub(products, 'getAllProducts').resolves([allProductsModel]);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(null, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos os produtos por id no controller', async function () {
    sinon.stub(products, 'getProductById').resolves([producByIdModel]);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos os produtos com id inválido', async function () {
    sinon.stub(products, 'getProductById').resolves([]);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  afterEach(function () {
    sinon.restore();
  });
});