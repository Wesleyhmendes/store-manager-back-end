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

  const [[newProduct]] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  return newProduct;
};

module.exports = {
  findAllModel,
  findProductById,
  insertProductsModel,
};
