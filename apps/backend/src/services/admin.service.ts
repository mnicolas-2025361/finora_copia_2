    import bcrypt from "bcrypt";
    import { pool } from "../config/database.js";

    export async function createDefaultAdmin() {
        const email = "admin@finora.com";
        const password = "Admin123";
        const name = "Administrador";

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existingAdmin.rows.length > 0) {
            await pool.query(
                `UPDATE users
                SET password = $1, role = 'ADMIN'
                WHERE email = $2`,
                [hashedPassword, email]
            );

            console.log("ℹ️ Administrador actualizado");
            return;
        }

        await pool.query(
            `INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, 'ADMIN')`,
            [name, email, hashedPassword]
        );

        console.log("✅ Administrador creado");
    }