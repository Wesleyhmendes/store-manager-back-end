const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { newProduct } = require('../../mocks/products.mock');

describe('Realizando testes para cadastro de produtos no model', function () {
  it('Testando o cadastro de um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[newProduct]]);

    const name = 'ProdutoX';
    const newProductObj = await productsModel.insertProductsModel(name);

    expect(newProductObj).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});