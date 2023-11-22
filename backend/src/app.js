const express = require('express');
const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductById);

app.get('/sales', salesController.getAllSalesController);

app.get('/sales/:id', salesController.getSalesByIdController);

module.exports = app;
