const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    producto: { type: String, required: true },
    valor: { type: Number, required: true },
    nombre: { type: String, required: true },
    cedula: { type: String, required: true },
    telefono: { type: String, required: true },
    tarjeta: { type: String, required: true },
    estado: { type: String, enum: ['Aceptado', 'Declinado'], required: true },
    fechaCompra: { type: Date, default: Date.now }
    });

module.exports = mongoose.model('Sale', SaleSchema);
