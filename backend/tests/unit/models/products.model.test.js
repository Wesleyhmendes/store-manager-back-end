const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsModel, producByIdModel } = require('../../mocks/products.mock');

describe('Realizando testes para listagem dos produtos', function () {
  it('Listando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsModel]);

    const findProducts = await productsModel.findAllModel();

    expect(findProducts).to.be.an('array');
    expect(findProducts).to.be.deep.equal(allProductsModel);
  });

  it('Listando todos os produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([[producByIdModel]]);

    const productId = 1;
    const findProductsById = await productsModel.findProductById(productId);

    expect(findProductsById).to.be.an('array');
    expect(findProductsById).to.be.deep.equal([producByIdModel]);
  });

  afterEach(function () {
    sinon.restore();
  });
});