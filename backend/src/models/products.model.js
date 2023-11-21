const connection = require('./connection');

const findAllModel = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );

  return products;
};

const findProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return product;
};

module.exports = {
  findAllModel,
  findProductById,
};
