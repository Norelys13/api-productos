//Este archivo contiene la lógica de la aplicación
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO1

const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //Dato común

//Todas las funciones serán ASÍNCRONAS (tardarán un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envían datos (pasarelas)
const listarProductos = async(req, res) => {
  try{
    console [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok: true,
      total: productos.lenght,
      data: productos
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
 }

const obtenerProductos = async(req, res) => {
  try{
    const id = Number(req.params.id) 
    if (id <= 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID no puede ser negativo o cero' 
      })
    }

    await pool.execute(`SELECT * FROM productos WHERE id = ?`, [id])

    if (registros.lenght === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }

    res.status(200).json({
      ok: true,
      message: registro[0]
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const crearProductos = async(req, res) => {
  try{
    
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const actualizarProductos = async(req, res) => { 
  try{
    
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

const eliminarProductos = async(req, res) => { 
  try{
    
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}

//Todos los metodos deben ser EXPORTADOS (se utilizarán desde la app)
//el que lo uitlizará será "routes"
module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  eliminarProductos
}