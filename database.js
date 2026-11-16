const mysql = require('mysql2/promise')
const {db} = require('./env')

//Este archivo gestiona la conexión al SERVER y a la BD
const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: db.connectionLimit,
  queueLimit: 0
})

const probarConexion = async() => {
  const conexión = await pool.getConnection()
  await conexión.ping
  conexión.release()
}

module.exports = {pool, probarConexion}