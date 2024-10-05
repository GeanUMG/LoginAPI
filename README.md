# LoginAPI
Api de Login

# Que realiza la API
El objetivo de esta hoja de trabajo es que los estudiantes implementen autenticación mediante JSON Web Tokens (JWT) en una API REST utilizando Node.js y Express.js. Los estudiantes deberán crear un sistema de login que genere un token JWT y proteger los endpoints de la API, de manera que solo los usuarios autenticados puedan acceder a ciertas rutas.
#Link de la API (https://loginapi-4.onrender.com/)

#Link para listar los usuarios ingresados token requerido (https://loginapi-1-t937.onrender.com/users)

Añadir autenticación con JWT mediante un endpoint /login, el cual recibirá las credenciales del usuario (como email y password) y devolverá un token JWT válido por 30 segundos. Además, deberán crear un archivo .env para manejar las respectivas variables de entorno, como la clave secreta.

Proteger los endpoints de la API utilizando un middleware que verifique el token JWT, asegurando que solo los usuarios autenticados puedan acceder a las siguientes rutas:

GET /users: Listar todos los usuarios.
PUT /users/:id: Actualizar un usuario por ID.
DELETE /users/:id: Eliminar un usuario por ID.

Api creada por: Gean Carlo Rosales 9490-21-2228
