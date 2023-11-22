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

const insertProductsModel = async (name) => {
  await connection.execute(
    `INSERT INTO products (name)
    VALUES(?);`,
    [name],
  );

  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return result[0];
};

module.exports = {
  findAllModel,
  findProductById,
  insertProductsModel,
};
