const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { 
  allProductsModel, producByIdModel, newProduct, updateProduct,
} = require('../../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes para produtos no controller', function () {
  it('Listando todos os produtos com sucesso no controller', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves([allProductsModel]);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(null, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos os produtos por id no controller', async function () {
    sinon.stub(productsService, 'getProductById').resolves([producByIdModel]);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Listando todos os produtos com id inválido', async function () {
    sinon.stub(productsService, 'getProductById').resolves([]);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
  });

  it('Inserindo produtos pelo controller com sucesso', async function () {
    sinon.stub(productsService, 'insertProductsService').resolves(newProduct);

    const req = { body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.insertProductsController(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it('Atualizando produtos pelo controller', async function () {
    sinon.stub(productsService, 'updateProductService').resolves(updateProduct);

    const req = { body: { name: 'Martelo do Batman' }, params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Deletando produtos pelo controller com sucesso', async function () {
    sinon.stub(productsService, 'deleteProductService').resolves({ status: 204 });

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(), 
    };

    await productsController.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Deletando produtos pelo controller com produto inválido', async function () {
    sinon.stub(productsService, 'deleteProductService').resolves({ status: 404, data: { message: 'Product not found' } });

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(), 
    };

    await productsController.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Pesquisando produtos com sucesso no controller', async function () {
    const serviceReturn = [{ id: 1, name: 'Martelo de Thor' }];
    sinon.stub(productsService, 'searchProductsService').resolves({ status: 200, data: serviceReturn });

    const req = { query: { q: 'Martelo' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(), 
    };

    await productsController.searchProductsController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceReturn);
  });

  afterEach(function () {
    sinon.restore();
  });
});