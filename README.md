# API - Tienda peru

API desarrollada con Node.js y Express que gestiona la informacion de una tienda. Permite administrar productos, clientes y proveedores mediante las operaciones basicas de un CRUD (listar, obtener, crear, actualizar y eliminar).

## Estructura del proyecto

api-productos/
database/
db.sql                      # Script de la BD (tablas y registros de prueba)
src/
config/
env.js                      # Lee y valida las variables de .env
database.js                 # Pool de conexiones a MySQL
controllers/                # Logica de cada modulo
producto.controller.js
cliente.controller.js
proveedor.controller.js
routes/                     # Rutas (verbos HTTP) de cada modulo
index.js                    # reune todas las rutas
producto.routes.js
cliente.routes.js
proveedor.routes.js
app.js                      # Configura Express y habilita las rutas
server.js                   # Prueba la conexion e inicia el servidor
.env                        # Variables de entorno (NO se sube al repositorio)
.gitignore
package.json
README.md

## Base de datos

Base de datos: tiendaperu. El script completo está en `database/db.sql`.

**productos**: `id`, `marca`, `descripcion`, `precio`, `stock`, `create_at`, `update_at`

**clientes**: `id`, `apellidos`, `nombres`, `telefono`, `direccion`, `email`, `create_at`, `updated_at`

**proveedores**: `id`, `razonsocial`, `contacto`, `ruc`, `direccion`, `create_at`, `updated_at`

Cada tabla incluye 3 registros de prueba.

## Endpoints

URL base: `http://localhost:3000/api`

Los tres módulos (`/productos`, `/clientes` y `/proveedores`)
