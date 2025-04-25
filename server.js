require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes'); // Asegúrate de que este archivo existe
const saleRoutes = require('./routes/saleRoutes'); // Asegúrate de que este archivo existe

const app = express(); // <- Aquí se declara 'app'

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sales', saleRoutes);

const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('🚀 Conectado a MongoDB');
        app.listen(PORT, () => console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => console.error('Error al conectar a MongoDB:', err));
