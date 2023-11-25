const connection = require('./connection');

const findAllModel = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity FROM sales as s
    INNER JOIN sales_products as sp
    ON s.id = sp.sale_id
    ORDER BY sale_id ASC, product_id ASC;`,
  );

  return sales;
};

const findSalesByIdModel = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id as productId, quantity FROM sales as s
    INNER JOIN sales_products as sp
    ON s.id = sp.sale_id
    WHERE id = ?;`,
    [id],
  );

  return sale;
};

const insertSalesModel = async (newSaleArray) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );

  const lastId = result.insertId;

  await Promise.all(newSaleArray.map(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [lastId, sale.productId, sale.quantity],
    );
  }));

  return { status: 201, data: { id: lastId, itemsSold: newSaleArray } };
};

const deleteSalesModel = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [id],
  );

  return { status: 204 };
};

module.exports = {
  findAllModel,
  findSalesByIdModel,
  insertSalesModel,
  deleteSalesModel,
};
