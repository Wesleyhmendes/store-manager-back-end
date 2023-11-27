const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateNewSale = require('../../../src/middlewares/newSale.validate');
const validateNewQuantity = require('../../../src/middlewares/saleNewQuantity.validate');
const { 
  newSaleMock, newSaleMockQuantityError, newSaleNoIdMock, newSaleMockQuantityZeroError,
} = require('../../mocks/sales.mock');

chai.use(sinonChai);

describe('Testando o middleware para inserir produtos', function () {
  it('Testando o cadastro de uma venda com sucesso no middleware', async function () {
    const req = { body: newSaleMock };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewSale(req, res, next);

    expect(res.status).not.to.have.been.calledWith();
    expect(res.json).not.to.have.been.calledWith();
    expect(next).to.have.been.calledWith();
  });

  it('Testando o cadastro de uma venda sem quantity no middleware', async function () {
    const req = { body: newSaleMockQuantityError };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testando o cadastro de uma venda com qunatity 0 no middleware', async function () {
    const req = { body: newSaleMockQuantityZeroError };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testando o cadastro de uma venda sem productId no middleware', async function () {
    const req = { body: newSaleNoIdMock };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewSale(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('Testando edição de uma venda sem a chave quantidade no middleware', async function () {
    const message = { message: '"quantity" is required' };
    const req = { body: { quantity: undefined } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(message);
    expect(next).not.to.have.been.calledWith();
  });

  it('Testando edição de uma venda com a chave quantidade menor que 1 no middleware', async function () {
    const message = { message: '"quantity" must be greater than or equal to 1' };
    const req = { body: { quantity: 0 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(message);
    expect(next).not.to.have.been.calledWith();
  });

  it('Testando edição de uma venda com a chave quantidade válida no middleware', async function () {
    const req = { body: { quantity: 10 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewQuantity(req, res, next);

    expect(res.status).not.to.have.been.calledWith();
    expect(res.json).not.to.have.been.calledWith();
    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});