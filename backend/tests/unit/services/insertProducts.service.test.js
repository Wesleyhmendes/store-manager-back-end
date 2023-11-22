const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { newProduct } = require('../../mocks/products.mock');

describe('Realizando testes para cadastro de produtos no model', function () {
  it('Testando o cadastro de um produto com sucesso', async function () {
    sinon.stub(productsModel, 'insertProductsModel').resolves(newProduct);

    const name = 'ProdutoX';
    const newProductObj = await productsService.insertProductsService(name);

    expect(newProductObj).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});