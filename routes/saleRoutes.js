const express = require('express');
const router = express.Router();
const { createSale, getSales } = require('../controllers/saleController');

// Rutas de ventas
router.post('/create', createSale);
router.get('/', getSales);

module.exports = router;
