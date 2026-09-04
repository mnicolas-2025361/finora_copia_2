import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { obtenerResumenHome } from '../controllers/home.controller.js';

const router: Router = Router();

router.get('/', authenticateToken, obtenerResumenHome);

export default router;