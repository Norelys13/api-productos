//Nuestra aplicacion puede tener muchos modulos:
//Productos > productos.controller > producto.routes
//Clientes > clientes.controller > clientes.routes
//Proveedores > proveedor.controller > proveedor.routes

const { Router } = require('express')

const productoRoutes = require('./producto.routes')

const router = Router()

//Esto es por cada routes **
router.use('/productos', productoRoutes)

//Se exportan todas las rutas
module.exports = router