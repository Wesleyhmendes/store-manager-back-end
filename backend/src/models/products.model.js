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
  await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?;`,
    [name, id],
  );

  return { status: 200, data: { id: Number(id), name } };
};

const deleteProductModel = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?;',
    [id],
  );

  return { status: 204 };
};

const searchProductModel = async (q) => {
  const [result] = await connection.execute(
    `SELECT * FROM products
    WHERE name LIKE ?`,
    [`%${q}%`],
  );
  
  return { status: 200, data: result };
};

module.exports = {
  findAllModel,
  findProductById,
  insertProductsModel,
  updateProductModel,
  deleteProductModel,
  searchProductModel,
};
