const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Load products data
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));

// Middleware to parse JSON requests
app.use(express.json());

// GET /products - Return all products
app.get('/products', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredProducts = products.filter(product => product.category === category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

// GET /products/:id - Fetch a specific product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(product => product.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});