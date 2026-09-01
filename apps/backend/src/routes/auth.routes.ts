import { Router, type IRouter } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authenticateToken, type AuthRequest } from "../middlewares/auth.middleware.js";

const router: IRouter = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateToken, (req: AuthRequest, res) => {
    res.status(200).json({
        message: "Sesión válida",
        user: req.user
    });
});

export default router;  