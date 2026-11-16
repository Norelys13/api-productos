const { pool } = require("../config/database");

const idValido = (id) => Number.isInteger(id) && id > 0;

const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
  const errores = [];
  if (!razonsocial || razonsocial.trim() === "")
    errores.push("La razón social es obligatoria");
  if (!contacto || contacto.trim() === "")
    errores.push("El contacto es obligatorio");
  if (!ruc || !/^\d{11}$/.test(ruc.trim()))
    errores.push("El RUC debe tener 11 dígitos");

  return errores;
};

const listarProveedores = async (req, res) => {
  try {
    const [proveedores] = await pool.query("SELECT * FROM proveedores ORDER BY id");
    res.status(200).json({
      ok: true,
      total: proveedores.length,
      data: proveedores,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const obtenerProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!idValido(id)) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero mayor a cero",
      });
    }

    const [registro] = await pool.execute(
      "SELECT * FROM proveedores WHERE id = ?",
      [id],
    );
    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
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

const crearProveedor = async (req, res) => {
  try {
    const errores = validarCampos(req.body);
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Verifique los datos solicitados",
        errores,
      });
    }

    const { razonsocial, contacto, ruc, direccion } = req.body;
    const consulta =
      "INSERT INTO proveedores (razonsocial, contacto, ruc, direccion) VALUES (?,?,?,?)";
    const [registro] = await pool.execute(consulta, [
      razonsocial.trim(),
      contacto.trim(),
      ruc.trim(),
      direccion ?? null,
    ]);

    res.status(201).json({
      ok: true,
      id: registro.insertId,
    });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un proveedor con ese RUC",
      });
    }
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const actualizarProveedor = async (req, res) => {
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
      "SELECT id FROM proveedores WHERE id = ?",
      [id],
    );
    if (existe.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
      });
    }

    const { razonsocial, contacto, ruc, direccion } = req.body;
    const consulta =
      "UPDATE proveedores SET razonsocial=?, contacto=?, ruc=?, direccion=?, updated_at=NOW() WHERE id=?";
    const [resultado] = await pool.execute(consulta, [
      razonsocial.trim(),
      contacto.trim(),
      ruc.trim(),
      direccion ?? null,
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
        message: "Ya existe un proveedor con ese RUC",
      });
    }
    console.error(e);
    res.status(500).json({
      ok: false,
      message: "Error interno en el servidor",
    });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!idValido(id)) {
      return res.status(400).json({
        ok: false,
        message: "El ID debe ser un número entero mayor a cero",
      });
    }

    const [resultado] = await pool.execute(
      "DELETE FROM proveedores WHERE id = ?",
      [id],
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: "No existe el proveedor",
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
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};
