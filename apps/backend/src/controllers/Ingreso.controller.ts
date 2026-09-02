import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import { pool } from '../config/database.js';
// 1. Obtener solo los ingresos del usuario logueado
export const obtenerIngresos = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user!.userId;

        const { rows } = await pool.query(
            'SELECT * FROM ingresos WHERE usuario_id = $1 ORDER BY id DESC',
            [usuarioId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener ingresos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los ingresos' });
    }
};

// 2. Registrar un nuevo ingreso, tomando el usuario del token (no del frontend)
export const crearIngreso = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user!.userId;
        const { descripcion, monto, fecha, categoria } = req.body;

        if (!descripcion || monto === undefined || monto === null) {
            res.status(400).json({ mensaje: 'La descripción y el monto son obligatorios' });
            return;
        }

        const fechaIngreso = fecha || new Date().toISOString().split('T')[0];
        const catIngreso = categoria || 'General';

        const query = `
            INSERT INTO ingresos (usuario_id, descripcion, monto, fecha, categoria) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING id
        `;
        const result = await pool.query(query, [usuarioId, descripcion, Number(monto), fechaIngreso, catIngreso]);

        res.status(201).json({
            mensaje: 'Ingreso guardado exitosamente',
            ingreso: {
                id: result.rows[0].id,
                usuario_id: usuarioId,
                descripcion,
                monto: Number(monto),
                fecha: fechaIngreso,
                categoria: catIngreso
            }
        });

    } catch (error) {
        console.error('Error al guardar el ingreso en PostgreSQL:', error);
        res.status(500).json({ mensaje: 'Error al registrar el ingreso' });
    }
};
// 3. Eliminar un ingreso de MySQL por su ID
export const eliminarIngreso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM ingresos WHERE id = $1';
        await pool.query(query, [id]);

        res.json({ mensaje: `Ingreso con id ${id} eliminado exitosamente de la base de datos` });

    } catch (error) {
        console.error('Error al eliminar el ingreso de PostgreSQL:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el ingreso' });
    }
};