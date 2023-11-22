const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { newProduct } = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes para cadastro de produtos no controller', function () {
  it('Cadastrando um produto com sucesso no controller', async function () {
    sinon.stub(productsService, 'insertProductsService').resolves([newProduct]);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = {
      body: { name: 'ProdutoX' },
    };

    await productsController.insertProductsController(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });
});