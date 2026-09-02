import { Router } from "express";
import { obtenerResumenHome } from "../controllers/homecontroller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = Router();
router.get("/resumen", authenticateToken, obtenerResumenHome);
export default router;
//# sourceMappingURL=home.routes.js.map