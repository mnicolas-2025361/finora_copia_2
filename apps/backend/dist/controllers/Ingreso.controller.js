import { pool } from '../config/database.js';
// 1. Obtener solo los ingresos del usuario logueado
export const obtenerIngresos = async (req, res) => {
    try {
        const usuarioId = req.user.userId;
        const { rows } = await pool.query('SELECT id, usuario_id, descripcion, monto, fecha, categoria FROM ingresos WHERE usuario_id = $1 ORDER BY fecha DESC, id DESC', [usuarioId]);
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener ingresos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los ingresos' });
    }
};
// 2. Registrar un nuevo ingreso, tomando el usuario del token (no del frontend)
export const crearIngreso = async (req, res) => {
    try {
        const usuarioId = req.user.userId;
        const { descripcion, monto, fecha, categoria } = req.body;
        if (!descripcion || monto === undefined || monto === null) {
            res.status(400).json({ mensaje: 'La descripcion y el monto son obligatorios' });
            return;
        }
        const montoNumerico = Number(monto);
        if (Number.isNaN(montoNumerico) || montoNumerico <= 0) {
            res.status(400).json({ mensaje: 'El monto debe ser un numero mayor a cero' });
            return;
        }
        const fechaIngreso = fecha || new Date().toISOString().split('T')[0];
        const catIngreso = categoria || 'General';
        const query = `
      INSERT INTO ingresos (usuario_id, descripcion, monto, fecha, categoria)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, usuario_id, descripcion, monto, fecha, categoria
    `;
        const result = await pool.query(query, [
            usuarioId,
            descripcion,
            montoNumerico,
            fechaIngreso,
            catIngreso
        ]);
        // Devolvemos el registro completo tal como quedo en la base de datos.
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error al guardar el ingreso en PostgreSQL:', error);
        res.status(500).json({ mensaje: 'Error al registrar el ingreso' });
    }
};
// 3. Eliminar un ingreso, validando que pertenezca al usuario del token
export const eliminarIngreso = async (req, res) => {
    try {
        const usuarioId = req.user.userId;
        const { id } = req.params;
        const result = await pool.query('DELETE FROM ingresos WHERE id = $1 AND usuario_id = $2', [id, usuarioId]);
        if (result.rowCount === 0) {
            res.status(404).json({ mensaje: 'Ingreso no encontrado' });
            return;
        }
        res.json({ mensaje: 'Ingreso eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el ingreso de PostgreSQL:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el ingreso' });
    }
};
//# sourceMappingURL=Ingreso.controller.js.map