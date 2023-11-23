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

const updateProductModel = async (id, name) => {
  const [error] = await connection.execute(
    'SELECT name FROM products WHERE id = ?',
    [id],
  );

  if (!error || error.length === 0) {
    return { status: 404, data: { message: 'Product not found' } };
  }

  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return { status: 200, data: result };
};

module.exports = {
  findAllModel,
  findProductById,
  insertProductsModel,
  updateProductModel,
};
