const { Router } = require('express')

const ProductoRoutes = require('./producto.routes')
const ClienteRoutes = require('./cliente.routes')
const ProveedorRoutes = require('./proveedor.routes')

const router = Router()

router.use('/productos', ProductoRoutes)
router.use('/clientes', ClienteRoutes)
router.use('/proveedores', ProveedorRoutes)

module.exports = router