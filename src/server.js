import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Configura el pool de conexión
const db = mysql.createPool({
  host: process.env.DB_HOST || 'containers-us-west-45.railway.app',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'railway',
  port: process.env.DB_PORT || 6442,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 30000,
  ssl: { rejectUnauthorized: false }
});

// Probar la conexión
async function testConnection(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Intento ${i + 1}/${retries} de conectar a MySQL...`);
      const [rows] = await db.query("SELECT NOW() AS now");
      console.log("✅ Conexión a MySQL exitosa → Hora del servidor:", rows[0].now);
      break;
    } catch (error) {
      console.error(`❌ Error en intento ${i + 1}/${retries}`, error.message);
      if (i < retries - 1) {
        console.log("⏳ Esperando 5 segundos antes de reintentar...");
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
}

testConnection();

// Ruta simple para comprobar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor y base de datos conectados correctamente 🚀');
});

// Escuchar el puerto asignado por Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en el puerto ${PORT}`);
});
