// models/product.js
const pool = require('../db');

const getAllProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM produits');
  return rows;
};

const getProductById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM produits WHERE _id = $1', [id]);
  return rows[0];
};

const createProduct = async (product) => {
  const { title, description, price } = product;
  const { rows } = await pool.query(
    'INSERT INTO produits (title, description, price) VALUES ($1, $2, $3) RETURNING *',
    [title, description, price]
  );
  return rows[0];
};

const updateProduct = async (id, product) => {
  const { title, description, price } = product;
  const { rows } = await pool.query(
    'UPDATE produits SET title = $1, description = $2, price = $3 WHERE _id = $4 RETURNING *',
    [title, description, price, id]
  );
  return rows[0];
};

const deleteProduct = async (id) => {
  const { rows } = await pool.query('DELETE FROM produits WHERE _id = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
