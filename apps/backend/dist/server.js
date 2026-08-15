import app from "./app.js";
import { pool } from "./config/database.js";
import { createDefaultAdmin } from "./services/admin.service.js";
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log(" Base de datos conectada");
        await createDefaultAdmin();
        app.listen(PORT, () => {
            console.log(` Backend iniciado en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(" Error iniciando el backend:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map