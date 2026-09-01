import type { Request, Response } from 'express';

// Obtener la lista de ingresos recientes para la tabla
export const obtenerIngresosRecientes = (req: Request, res: Response) => {
  // Simulación de datos que vendrían de tu base de datos (MySQL / PostgreSQL)
  const listaIngresos = [
    { descripcion: 'Salario', monto: 7000.00, fecha: '2026-04-01' },
    { descripcion: 'Freelance', monto: 1500.00, fecha: '2026-04-15' }
  ];

  res.json(listaIngresos);
};

// Registrar un nuevo ingreso
export const crearIngreso = (req: Request, res: Response) => {
  const nuevoIngreso = req.body;
  
  // Aquí guardarías el 'nuevoIngreso' en tu base de datos
  
  res.status(201).json({ 
    mensaje: 'Ingreso guardado exitosamente', 
    ingreso: nuevoIngreso 
  });
};