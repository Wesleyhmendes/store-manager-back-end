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

  it('Cadastrando produtos no model com sucesso', async function () {
    const modelResolve = { id: 3, name: 'ProdutoX' };
    sinon.stub(connection, 'execute').onFirstCall().resolves([{ insertId: 3 }])
      .onSecondCall()
      .resolves([[modelResolve]]);

    const newProduct = await productsModel.insertProductsModel('ProdutoX');

    expect(newProduct).to.be.deep.equal(modelResolve);
  });

  it('Atualizando produtos no model com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const newProduct = await productsModel.updateProductModel(1, 'Martelo do Batman');

    expect(newProduct).to.be.deep.equal({ status: 200, data: { id: 1, name: 'Martelo do Batman' } });
  });

  it('Deletando produtos no model com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const newProduct = await productsModel.deleteProductModel(1);

    expect(newProduct).to.be.deep.equal({ status: 204 });
  });

  it('Pesquisando produtos no model com sucesso', async function () {
    const findAllModelReturn = [{ id: 1, name: 'Martelo de Thor' }];
    sinon.stub(connection, 'execute').resolves([findAllModelReturn]);

    const result = await productsModel.searchProductModel('Martelo');

    expect(result.status).to.be.equal(200);
    expect(result.data).to.be.deep.equal(findAllModelReturn);
  });

  afterEach(function () {
    sinon.restore();
  });
});
