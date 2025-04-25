const User = require('../models/User');  // Verifica que este archivo existe
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

/*
const loginUser = async (req, res) => {
    res.json({ message: 'Login de usuario (por implementar)' });
};*/

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Enviar token y rol al frontend
        res.json({
            token,
            role: user.role, // 👈 NECESARIO para redirigir según rol
            message: "Inicio de sesión exitoso",
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};




module.exports = { registerUser, loginUser }; // 🔥 Asegúrate de exportar ambas funciones
