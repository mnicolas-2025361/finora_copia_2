import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
export declare const obtenerIngresos: (req: AuthRequest, res: Response) => Promise<void>;
export declare const crearIngreso: (req: AuthRequest, res: Response) => Promise<void>;
export declare const eliminarIngreso: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=Ingreso.controller.d.ts.map