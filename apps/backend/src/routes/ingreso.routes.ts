import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
    obtenerIngresos,
    crearIngreso,
    eliminarIngreso
} from '../controllers/Ingreso.controller.js';

const router: Router = Router();

router.get('/', authenticateToken, obtenerIngresos);
router.post('/', authenticateToken, crearIngreso);
router.delete('/:id', authenticateToken, eliminarIngreso);

export default router;
