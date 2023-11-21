const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { products } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const productsController = require('../../../src/controllers/products.controller');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');

describe('Realizando testes para listagem dos produtos no service', function () {
  it('Listando todos os produtos com sucesso no service', async function () {
    sinon.stub(productsModel, 'findAllModel').resolves(allProductsModel);

    const findProducts = await products.getAllProducts();

    expect(findProducts).to.be.an('array');
    expect(findProducts).to.be.deep.equal(allProductsModel);
  });

  it('Listando todos os produtos por id  no service', async function () {
    sinon.stub(productsModel, 'findProductById').resolves([producByIdModel]);

    const productId = 1;
    const findProductsById = await products.getProductById(productId);

    expect(findProductsById).to.be.an('array');
    expect(findProductsById).to.be.deep.equal([producByIdModel]);
  });

  it('Deve retornar 404 se o produto não existir  no service', async function () {
    sinon.stub(productsModel, 'findProductById').resolves([]);

    const req = { params: { id: 999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status.calledWith(404));
    expect(res.json.calledWith({ message: 'Product not found' }));
  });

  afterEach(function () {
    sinon.restore();
  });
});