import { pool } from "./database.js";
async function createUsersTable() {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20) NOT NULL DEFAULT 'USER',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);
        console.log("Tabla users creada correctamente.");
    }
    catch (error) {
        console.error("Error al crear la tabla users:", error);
    }
    finally {
        await pool.end();
    }
}
createUsersTable();
//# sourceMappingURL=createUsersTable.js.map