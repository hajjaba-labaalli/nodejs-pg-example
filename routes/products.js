// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const products = await Product.getAllProducts();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.getProductById(req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const newProduct = await Product.createProduct(req.body);
  res.json(newProduct);
});

router.put('/:id', async (req, res) => {
  const updatedProduct = await Product.updateProduct(req.params.id, req.body);
  res.json(updatedProduct);
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.deleteProduct(req.params.id);
  res.json(deletedProduct);
});

module.exports = router;
