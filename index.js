const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde el archivo .env

let users = [
    { dpi: '1234567890', name: 'Juan Pérez', email: 'juan@example.com', password: 'password123' },
    { dpi: '9876543210', name: 'Maria García', email: 'maria@example.com', password: 'password456' },
    { dpi: '1111222233', name: 'Carlos López', email: 'carlos@example.com', password: 'password789' }
];

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para manejar JSON en las solicitudes



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = users.find(user => user.email == email && user.password == password);
    console.log("user")

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT válido por 30 segundos
    const token = jwt.sign({ dpi: user.dpi, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '30s'
    });

    res.status(200).json({ message: 'Login exitoso', token });
});
// Middleware para verificar el token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    // Verificar el token
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user; // Añadir el usuario verificado al request
        next();
    });
};
// GET /users: Listar todos los usuarios (protegido)
app.get('/users', authenticateJWT, (req, res) => {
    res.status(200).json(users);
});
// PUT /users/:dpi: Actualizar un usuario existente (protegido)
app.put('/users/:dpi', authenticateJWT, (req, res) => {
    const { dpi } = req.params;
    const { name, email, password, newDpi } = req.body;

    const userIndex = users.findIndex(user => user.dpi === dpi);

    // Validar si el usuario existe
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validar si se está intentando cambiar el DPI a uno ya registrado
    if (newDpi && newDpi !== dpi) {
        const dpiExists = users.some(user => user.dpi === newDpi);
        if (dpiExists) {
            return res.status(400).json({ message: 'El nuevo DPI ya está registrado' });
        }
        users[userIndex].dpi = newDpi;
    }

    // Actualizar los datos del usuario
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (password) users[userIndex].password = password;

    res.status(200).json({ message: 'Usuario actualizado', user: users[userIndex] });
});
// DELETE /users/:dpi: Eliminar un usuario (protegido)
app.delete('/users/:dpi', authenticateJWT, (req, res) => {
    const { dpi } = req.params;

    const userIndex = users.findIndex(user => user.dpi === dpi);

    // Validar si el usuario existe
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
});
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
