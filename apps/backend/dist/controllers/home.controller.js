import { pool } from '../config/database.js';
export const obtenerResumenHome = async (req, res) => {
    try {
        const usuarioId = req.user.userId;
        // Primer y último día del mes en curso
        const ahora = new Date();
        const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
            .toISOString().split('T')[0];
        const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0)
            .toISOString().split('T')[0];
        // COALESCE evita null cuando todavía no hay registros
        const ingresosMesQuery = pool.query(`SELECT COALESCE(SUM(monto), 0) AS total
       FROM ingresos
       WHERE usuario_id = $1 AND fecha BETWEEN $2 AND $3`, [usuarioId, inicioMes, finMes]);
        const gastosMesQuery = pool.query(`SELECT COALESCE(SUM(monto), 0) AS total
       FROM gastos
       WHERE usuario_id = $1 AND fecha BETWEEN $2 AND $3`, [usuarioId, inicioMes, finMes]);
        // Las dos consultas corren en paralelo
        const [ingresosMes, gastosMes] = await Promise.all([
            ingresosMesQuery,
            gastosMesQuery
        ]);
        const totalIngresos = Number(ingresosMes.rows[0].total);
        const totalGastos = Number(gastosMes.rows[0].total);
        res.json({
            presupuesto: totalIngresos,
            gastado: totalGastos,
            saldoDisponible: totalIngresos - totalGastos,
            mes: `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`
        });
    }
    catch (error) {
        console.error('Error al obtener el resumen del home:', error);
        res.status(500).json({ mensaje: 'Error al obtener el resumen financiero' });
    }
};
//# sourceMappingURL=home.controller.js.map