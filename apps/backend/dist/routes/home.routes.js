import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { obtenerResumenHome } from '../controllers/home.controller.js';
const router = Router();
router.get('/', authenticateToken, obtenerResumenHome);
export default router;
//# sourceMappingURL=home.routes.js.map