# LoginAPI typescript
Api de Login typescript

# Que realiza la API
El objetivo de esta hoja de trabajo es que los estudiantes refactoricen la API REST creada en la Hoja de Trabajo 6 y 7 para agregar validaciones de tipo mediante TypeScript. Deberán adaptar el código existente para utilizar las características de TypeScript, como las interfaces y tipos, mejorando la seguridad del código y evitando errores de tipo en tiempo de ejecución. (https://loginapi-4.onrender.com/)

#Link para listar los usuarios ingresados token requerido (https://loginapi-4.onrender.com/)
Validaciones de Tipo:

Implementar validaciones de tipo para los usuarios.
Definir una interfaz User que contenga las propiedades: name, email, password, y DPI.
Usar dicha interfaz en todos los endpoints para validar que los objetos User tengan la estructura correcta.

Refactorización de los Endpoints:
POST /users: Validar que el cuerpo de la solicitud sea de tipo User antes de crear un nuevo usuario.
GET /users: Asegurarse de que el arreglo de usuarios sea de tipo User[].
PUT /users/: Verificar que los datos proporcionados para la actualización sean válidos de acuerdo a la interfaz User.
DELETE /users/: Validar que el id del usuario exista y que los tipos de datos sean correctos.

Migración del Sistema de Autenticación JWT:
Adaptar el sistema de autenticación JWT desarrollado en la Hoja de Trabajo 6 para TypeScript.
Validar que los tokens y las credenciales de usuario sean del tipo adecuado utilizando tipos de TypeScript.

Api creada por: Gean Carlo Rosales 9490-21-2228
