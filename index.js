// server.js
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
