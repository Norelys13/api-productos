//Este archivo contiene la lógica de la aplicación
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO1
const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //Dato común

//Todas las funciones serán ASÍNCRONAS (tardarán un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envían datos (pasarelas)

const validarCampos = ({marca, descripcion, precio, stock} = {}) =>{
  const errores = []

  if (marca.trim() === '') errores.push('La marca es obligatoria')
  if (descripcion.trim() === '') errores.push('La descripcion es necesaria')
  if (precio === undefined || isNaN(precio) || precio < 0) errores.push('Verifique el precio')
  if (stock === undefined || !Number.isInteger(stock) || Number(stock) < 0) errores.push('Error en el stock')

    return errores
}

const listarProductos = async(req, res) => {
  try{
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok: true,
      total: productos.length,
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

    const [registro] = await pool.execute(`SELECT * FROM productos WHERE id = ?`, [id])

    if (registro.length === 0){
      return res.status(404).json({
        ok: false,
        message: 'No existe el producto'
      })
    }

    res.status(200).json({
      ok: true,
      data: registro[0]
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
    const errores = validarCampos(req.body)
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const {marca, descripcion, precio, stock} = req.body
    const consulta = `INSERT INTO productos (marca, descripcion, precio, stock) VALUES (?,?,?,?)`
    await pool.execute(consulta, [marca, descripcion, precio, stock])

    res.status(201).json({
      ok: true,
      id: registro.insertID
    })

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
    const id = Number (req.params.id)

    if(id < 0){
      return res.status(400).json({
        ok: false,
        message: 'El ID no puede ser negativo'
      })
    }

    const errores = validarCampos(req.body)
    if (errores.length > 0){
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const [existe] = await pool.execute('SELECT id FROM productos WHERE id = ?', [id])
    if (existe === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    const consulta = 'UPDATE productos SET marca=?, descripcion=?, precio=?, stock=? WHERE id=?'
    const { marca, descripcion, precio, stock } = req.body
    const [resultado] = await pool.execute(consulta, [marca, descripcion, precio, stock, id])

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows
    })

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
    const id = Number(req.params.id)

    const [resultado] = await pool.execute('DELETE FROM productos WHERE id = ?', [id])

    if (resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        message: 'El ID no existe'
      })
    }

    res.status(200).json({
    ok: true,
    message: 'Producto eliminado'
    })

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