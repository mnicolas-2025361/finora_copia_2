import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado en el archivo .env");
}

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        role: string;
    };
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            message: "No se proporcionó un token"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Token inválido"
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
            role: string;
        };

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Sesión expirada o token inválido"
        });
    }
}