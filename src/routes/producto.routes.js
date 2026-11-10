const { Router } = require('express')
const controller = require ('../controllers/producto.controller')

const router = Router()

router.get('/', controller.listarProductos)
router.get('/:id', controller.obtenerProductos)

module.exports = router