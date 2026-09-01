import { Router, type IRouter } from "express";
import { obtenerResumenHome } from "../controllers/homecontroller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router: IRouter = Router();

router.get("/resumen", authenticateToken, obtenerResumenHome);

export default router;