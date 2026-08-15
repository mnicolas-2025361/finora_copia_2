import { pool } from "./config/database.js";

async function testDatabase() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(" Base de datos conectada");
        console.log("Hora de PostgreSQL:", result.rows[0]);
    } catch (error) {
        console.error(" Error conectando a PostgreSQL:", error);
    } finally {
        await pool.end();
    }
}

testDatabase();