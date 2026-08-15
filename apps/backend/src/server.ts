    import { pool } from "./config/database.js";
    import { createDefaultAdmin } from "./services/admin.service.js";

    async function startServer() {
    try {
        await pool.query("SELECT NOW()");

        console.log(" Base de datos conectada");

        await createDefaultAdmin();

        console.log(" Backend iniciado");
    } catch (error) {
        console.error(" Error iniciando el backend:", error);
        process.exit(1);
    }
    }

    startServer();