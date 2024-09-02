// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
});

module.exports = router;
