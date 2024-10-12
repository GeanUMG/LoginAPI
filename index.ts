import express, { Request, Response } from 'express';
import { User } from './types/user'; // Importa la interfaz del tipo User

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para manejar JSON en las solicitudes

let users: User[] = []; // Arreglo temporal para almacenar usuarios con el tipo definido

// Ruta para la raíz
app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenido a la API de gestión de usuarios');
});

// POST /users: Crear un nuevo usuario
app.post('/users', (req: Request, res: Response) => {
    const { dpi, name, email, password }: User = req.body;

    // Validar si el DPI ya existe
    const userExists = users.some(user => user.dpi === dpi);
    if (userExists) {
        res.status(400).json({ message: 'El DPI ya está registrado' });
        return;
    }
    // Agregar nuevo usuario al arreglo
    const newUser: User = { dpi, name, email, password };
    users.push(newUser);

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
});

// GET /users: Listar todos los usuarios
app.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

// PUT /users/:dpi: Actualizar un usuario existente
app.put('/users/:dpi', (req: Request, res: Response) => {
    const { dpi } = req.params;
    const { name, email, password, newDpi }: Partial<User> = req.body;

    const userIndex = users.findIndex(user => user.dpi === dpi);

    // Validar si el usuario existe
    if (userIndex === -1) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }

    // Validar si se está intentando cambiar el DPI a uno ya registrado
    if (newDpi && newDpi !== dpi) {
        const dpiExists = users.some(user => user.dpi === newDpi);
        if (dpiExists) {
             res.status(400).json({ message: 'El nuevo DPI ya está registrado' });
             return
        }
        users[userIndex].dpi = newDpi;
    }

    // Actualizar los datos del usuario si están presentes
    if (name !== undefined) users[userIndex].name = name;
    if (email !== undefined) users[userIndex].email = email;
    if (password !== undefined) users[userIndex].password = password;

    res.status(200).json({ message: 'Usuario actualizado', user: users[userIndex] });
});

// DELETE /users/:dpi: Eliminar un usuario
app.delete('/users/:dpi', (req: Request, res: Response) => {
    const { dpi } = req.params;

    const userIndex = users.findIndex(user => user.dpi === dpi);

    // Validar si el usuario existe
    if (userIndex === -1) {
         res.status(404).json({ message: 'Usuario no encontrado' });
         return
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
