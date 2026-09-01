import express, { type Express } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;