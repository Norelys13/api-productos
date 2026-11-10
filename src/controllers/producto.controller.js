//Este archivo contiene la lógica de la aplicación
// 5 procedimientos: buscar, listar, registrar, actualizar, eliminar

//PASO1

const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' //Dato común

//Todas las funciones serán ASÍNCRONAS (tardarán un tiempo en ser resueltas...)
//milisegundos, segundos (1000 = 1seg)
//Todas las funciones reciben y envían datos (pasarelas)
const listarProductos = async(req, res) => { }

const obtenerProductos = async(req, res) => { }

const crearProductos = async(req, res) => { }

const actualizarProductos = async(req, res) => { }

const eliminarProductos = async(req, res) => { }

//Todos los metodos deben ser EXPORTADOS (se utilizarán desde la app)
//el que lo uitlizará será "routes"
module.exports = {
  listarProductos,
  obtenerProductos,
  crearProductos,
  actualizarProductos,
  eliminarProductos
}