import bcrypt from "bcrypt";
import { pool } from "../config/database.js";

export async function createAdmin(
    name: string,
    email: string,
    password: string
): Promise<void> {
    const existingAdmin = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );

    if (existingAdmin.rows.length > 0) {
        throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        `INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, 'ADMIN')`,
        [name, email, hashedPassword]
    );

    console.log(" Administrador creado");
}