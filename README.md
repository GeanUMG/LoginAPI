# LoginAPI
Api de Login

# Que realiza la API
La api podra crear,editar,podra listar y eliminar los usuarios Se probo la Api mandando un registro por medio de comando y funciono a continuacion dejo la API y como devuelve el usuario y los comandos localmente.

#Link de la API (https://loginapi-4.onrender.com/)

#Link para listar los usuarios ingresados (https://loginapi-4.onrender.com/users)

#Los comandos para ejecutarlo localmente:

Crear Usuario:
curl -X POST https://loginapi-4.onrender.com/users -H "Content-Type: application/json" -d '{"dpi":"123456789","name":"Juan Pérez","email":"juan@example.com","password":"contraseña123"}'

Listar Usuarios:
curl -X GET https://loginapi-4.onrender.com/users

Actualizar:
curl -X PUT https://loginapi-4.onrender.com/users/123456789 -H "Content-Type: application/json" -d '{"name":"Juan Pérez Actualizado","email":"juan.nuevo@example.com","password":"nuevaContraseña"}'

Eliminar:

curl -X DELETE https://loginapi-4.onrender.com/users/123456789

Api creada por: Gean Carlo Rosales 9490-21-2228
