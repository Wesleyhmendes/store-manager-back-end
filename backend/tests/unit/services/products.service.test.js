const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productsController } = require('../../../src/controllers');
const { allProductsModel, producByIdModel, newProduct, productResolvedError } = require('../../mocks/products.mock');

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
    expect(res.json.calledWith(productResolvedError));
  });

  it('Cadastra produtos no service', async function () {
    sinon.stub(productsModel, 'insertProductsModel').resolves(newProduct);
    
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsService.insertProductsService(newProduct);

    expect(res.status.calledWith(404));
    expect(res.json.calledWith(productResolvedError));
  });

  it('Atualiza produtos no service', async function () {
    const updateProductModelResolve = {
      id: 1,
      name: 'Martelo do Batman',
    };
    sinon.stub(productsModel, 'updateProductModel')
      .resolves({ status: 200, data: updateProductModelResolve });
    sinon.stub(productsModel, 'findProductById').resolves([updateProductModelResolve]);

    const result = await productsService.updateProductService(updateProductModelResolve);

    expect(result.data).to.be.equal(updateProductModelResolve);
  });

  it('Atualiza produtos no service com id inválido no service', async function () {  
    sinon.stub(productsModel, 'findProductById').resolves([]);

    const result = await productsService.updateProductService(123, 'Martelo do Batman');

    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
    expect(result.status).to.be.equal(404);
  });

  it('Deleta um produto do service', async function () {
    const deleteProductModelResolve = {
      id: 1,
      name: 'Martelo do Batman',
    };
    sinon.stub(productsModel, 'deleteProductModel').resolves({ status: 204 });
    sinon.stub(productsModel, 'findProductById').resolves([deleteProductModelResolve]);

    const result = await productsService.deleteProductService({ status: 204 });

    expect(result.status).to.be.equal(204);
  });

  it('Deleta um produto do service com id inválido no service', async function () {
    sinon.stub(productsModel, 'deleteProductModel').resolves(productResolvedError);
    sinon.stub(productsModel, 'findProductById').resolves([]);

    const result = await productsService.deleteProductService(22);

    expect(result.data).to.be.deep.equal({ message: 'Product not found' });
    expect(result.status).to.be.equal(404);
  });

  it('Pesquisa por um produto com sucesso no service', async function () {
    const modelReturn = { status: 200, data: [{ id: 1, name: 'Martelo de Thor' }] };
    sinon.stub(productsModel, 'searchProductModel').resolves(modelReturn);

    const result = await productsService.searchProductsService('Martelo');

    expect(result.data).to.be.deep.equal(modelReturn.data);
    expect(result.status).to.be.equal(200);
  });

  it('Pesquisa todos os produtos sem o parametro "q" com sucesso no service', async function () {
    const modelReturn = { status: 200, data: [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Traje de encolhimento' }] };
    const findAllModelReturn = [{ id: 1, name: 'Martelo de Thor' }, { id: 2, name: 'Traje de encolhimento' }];

    sinon.stub(productsModel, 'searchProductModel').resolves(modelReturn);
    sinon.stub(productsModel, 'findAllModel').resolves(findAllModelReturn);

    const result = await productsService.searchProductsService();

    expect(result.data).to.be.deep.equal(findAllModelReturn);
    expect(result.status).to.be.equal(200);
  });

  afterEach(function () {
    sinon.restore();
  });
});
