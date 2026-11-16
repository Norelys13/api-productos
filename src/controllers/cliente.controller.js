const { pool } = require("../config/database");

const idValido = (id) => Number.isInteger(id) && id > 0;

//Crear - actualizar
const validarCampos = ({ apellidos, nombres, telefono, direccion, email } = {}) => {
  const errores = [];
  if (!apellidos || apellidos.trim() === "")
    errores.push("Los apellidos son obligatorios");
  if (!nombres || nombres.trim() === "")
    errores.push("Los nombres son obligatorios");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errores.push("Verifique el email");

  return errores;
};

const listarClientes = async (req, res) => {
  try {
    const [clientes] = await pool.query("SELECT * FROM clientes ORDER BY id");
    res.status(200).json({
      ok: true,
      total: clientes.length,
      data: clientes,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!idValido(id)) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero mayor a cero",
      });
    }

    const [registro] = await pool.execute(
      "SELECT * FROM clientes WHERE id = ?",
      [id],
    );
    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el cliente",
      });
    }

    res.status(200).json({
      ok: true,
      data: registro[0],
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const crearCliente = async (req, res) => {
  try {
    const errores = validarCampos(req.body);
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Verifique los datos solicitados",
        errores,
      });
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const consulta =
      "INSERT INTO clientes (apellidos, nombres, telefono, direccion, email) VALUES (?,?,?,?,?)";
    const [registro] = await pool.execute(consulta, [
      apellidos.trim(),
      nombres.trim(),
      telefono ?? null,
      direccion ?? null,
      email.trim(),
    ]);

    res.status(201).json({
      ok: true,
      id: registro.insertId,
    });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un cliente con ese email",
      });
    }
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!idValido(id)) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero mayor a cero",
      });
    }

    const errores = validarCampos(req.body);
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Verifique los datos solicitados",
        errores,
      });
    }

    const [existe] = await pool.execute(
      "SELECT id FROM clientes WHERE id = ?",
      [id],
    );
    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el cliente",
      });
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body;
    const consulta =
      "UPDATE clientes SET apellidos=?, nombres=?, telefono=?, direccion=?, email=?, updated_at=NOW() WHERE id=?";
    const [resultado] = await pool.execute(consulta, [
      apellidos.trim(),
      nombres.trim(),
      telefono ?? null,
      direccion ?? null,
      email.trim(),
      id,
    ]);

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows,
    });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un cliente con ese email",
      });
    }
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!idValido(id)) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero mayor a cero",
      });
    }

    const [resultado] = await pool.execute(
      "DELETE FROM clientes WHERE id = ?",
      [id],
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el cliente",
      });
    }

    res.status(200).json({
      ok: true,
      filasAfectadas: resultado.affectedRows,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
