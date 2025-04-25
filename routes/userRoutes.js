const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // Asegúrate de que el path es correcto

// Rutas de usuario
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
