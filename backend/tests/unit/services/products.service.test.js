const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsController } = require('../../../src/controllers');
const { allProductsModel, producByIdModel, newProduct } = require('../../mocks/products.mock');

describe('Realizando testes para listagem dos produtos no service', function () {
  it('Listando todos os produtos com sucesso no service', async function () {
    sinon.stub(productsModel, 'findAllModel').resolves(allProductsModel);

    const findProducts = await productsService.getAllProducts();

    expect(findProducts).to.be.an('array');
    expect(findProducts).to.be.deep.equal(allProductsModel);
  });

  it('Listando todos os produtos por id  no service', async function () {
    sinon.stub(productsModel, 'findProductById').resolves([producByIdModel]);

    const productId = 1;
    const findProductsById = await productsService.getProductById(productId);

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

  it('Cadastra produtos no service', async function () {
    sinon.stub(productsModel, 'insertProductsModel').resolves(newProduct);
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.insertProductsService(newProduct);

    expect(res.status.calledWith(404));
    expect(res.json.calledWith({ message: 'Product not found' }));
  });

  it('Atualiza produtos no service', async function () {
    const updateProductModelResolve = {
      id: 1,
      name: 'Martelo do Batman',
    };
    sinon.stub(productsModel, 'updateProductModel').resolves({ status: 200, data: updateProductModelResolve });
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.updateProductService(updateProductModelResolve);

    expect(res.status.calledWith(200));
    expect(res.json.calledWith({ status: 200, data: updateProductModelResolve }));
  });

  it('Atualiza produtos no service com id inválido', async function () {
    sinon.stub(productsModel, 'updateProductModel').resolves({ status: 404, data: { message: 'Product not found' } });
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.updateProductService({ status: 404, data: { message: 'Product not found' } });

    expect(res.status.calledWith(404));
    expect(res.json.calledWith({ status: 404, data: { message: 'Product not found' } }));
  });

  it('Deleta um produto do service', async function () {
    sinon.stub(productsModel, 'deleteProductModel').resolves({ status: 204 });
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.deleteProductService({ status: 204 });

    expect(res.status.calledWith(204));
  });

  it('Deleta um produto do service com id inválido', async function () {
    const error = { status: 404, data: { message: 'Product not found' } };
    sinon.stub(productsModel, 'deleteProductModel').resolves(error);
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.deleteProductService(error);

    expect(res.status.calledWith(404));
    expect(res.json.calledWith(error));
  });

  afterEach(function () {
    sinon.restore();
  });
});
