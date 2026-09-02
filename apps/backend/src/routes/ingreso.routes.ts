import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { obtenerIngresos, crearIngreso } from '../controllers/Ingreso.controller.js';

const router: Router = Router();

router.get('/ingresos', authenticateToken, obtenerIngresos);
router.post('/ingresos', authenticateToken, crearIngreso);

export default router;