const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para manejar JSON en las solicitudes

let users = []; // Arreglo temporal para almacenar usuarios

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de usuarios');
});

// POST /users: Crear un nuevo usuario
app.post('/users', (req, res) => {
    const { dpi, name, email, password } = req.body;

    // Validar si el DPI ya existe
    const userExists = users.some(user => user.dpi === dpi);
    if (userExists) {
        return res.status(400).json({ message: 'El DPI ya está registrado' });
    }

    // Agregar nuevo usuario al arreglo
    const newUser = { dpi, name, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
});

// GET /users: Listar todos los usuarios
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// PUT /users/:dpi: Actualizar un usuario existente
app.put('/users/:dpi', (req, res) => {
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

// DELETE /users/:dpi: Eliminar un usuario
app.delete('/users/:dpi', (req, res) => {
    const { dpi } = req.params;

    const userIndex = users.findIndex(user => user.dpi === dpi);

    // Validar si el usuario existe
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
