import { Router, type IRouter } from "express";
import { obtenerIngresosRecientes, crearIngreso } from "../controllers/IngresoController.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router: IRouter = Router();

router.get("/", authenticateToken, obtenerIngresosRecientes);
router.post("/", authenticateToken, crearIngreso);

export default router;