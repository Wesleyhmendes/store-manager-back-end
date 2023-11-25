const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const validateNewProduct = require('../../../src/middlewares/newProduct.validate');

describe('Testando o middleware para inserir produtos', function () {
  it('Testando o cadastro de um produto com sucesso', async function () {
    const req = { body: { name: 'Patos' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewProduct(req, res, next);

    expect(res.status).not.to.have.been.calledWith();
    expect(res.json).not.to.have.been.calledWith();
    expect(next).to.have.been.calledWith();
  });

  it('Testando o cadastro de um produto sem nome', async function () {
    const req = { body: { name: '' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewProduct(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(res.status).to.have.been.calledWith(400);
  });

  it('Testando o cadastro de um produto com nome com 4 caracteres', async function () {
    const req = { body: { name: 'Pato' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateNewProduct(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    expect(res.status).to.have.been.calledWith(422);
  });

  afterEach(function () {
    sinon.restore();
  });
});