/* eslint-disable max-lines-per-function */
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
  let lastId;
  if (newSaleArray.length > 0) {
    await Promise.all(newSaleArray.map(async (sale) => {
      const [result] = await connection.execute(
        'INSERT INTO sales (date) VALUES (NOW());',
      );

      lastId = result.insertId;

      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
        [lastId, sale.productId, sale.quantity],
      );
    }));

    const newSales = await Promise.all(
      newSaleArray.map(async (sale) => {
        const [newSale] = await connection.execute(
          `SELECT * FROM sales_products AS sp INNER JOIN sales AS s ON s.id = sp.sale_id
          WHERE sp.product_id = ?;`,
          [sale.productId],
        );
        return newSale;
      }),
    );
    return { id: lastId, itemsSold: newSales };
  }
  return [];
};

module.exports = {
  findAllModel,
  findSalesByIdModel,
  insertSalesModel,
};
