const express = require('express');
const productsController = require('./controllers/products.controller');
const salesController = require('./controllers/sales.controller');
const validateNewProduct = require('./middlewares/newProduct.validate');
const validateNewSale = require('./middlewares/newSale.validate');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.getAllProducts);

app.get('/products/:id', productsController.getProductById);

app.post('/products', validateNewProduct, productsController.insertProductsController);

app.get('/sales', salesController.getAllSalesController);

app.get('/sales/:id', salesController.getSalesByIdController);

app.post('/sales', validateNewSale, salesController.insertSalesController);

app.put('/products/:id', validateNewProduct, productsController.updateProductController);

app.delete('/products/:id', productsController.deleteProductController);

module.exports = app;
