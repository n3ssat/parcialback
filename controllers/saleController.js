/*const createSale = (req, res) => {
    res.status(201).json({ message: 'Venta creada correctamente' });
};

const getSales = (req, res) => {
    res.json({ message: 'Lista de ventas' });
};

module.exports = { createSale, getSales };
*/

const Sale = require('../models/Sale');

const createSale = async (req, res) => {
    try {
        const { producto, valor, nombre, cedula, telefono, tarjeta, estado } = req.body;

        if (!producto || !valor || !nombre || !cedula || !telefono || !tarjeta || !estado) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const sale = new Sale({ producto, valor, nombre, cedula, telefono, tarjeta, estado });
        await sale.save();

        res.status(201).json({ message: "Venta registrada", sale });
    } catch (error) {
        console.error("Error en createSale:", error);
        res.status(500).json({ message: "Error al registrar la venta", error });
    }
};

const getSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ventas", error });
    }
};

module.exports = { createSale, getSales };
