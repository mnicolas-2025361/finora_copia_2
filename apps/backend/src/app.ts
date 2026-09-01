import express, { type Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import homeRoutes from "./routes/home.routes.js";
import ingresoRoutes from "./routes/ingreso.routes.js";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Montar tus rutas
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/ingresos", ingresoRoutes);

export default app;