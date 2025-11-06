import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Crear pool de conexiones usando las variables del .env
const db = mysql.createPool({
  host: process.env.DB_HOST || 'containers-us-west-45.railway.app',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'salon_sf',
  port: process.env.DB_PORT || 6442,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 30000, // 30 segundos
  ssl: {
    rejectUnauthorized: false
  }
});

// Probar la conexión con reintentos
async function testConnection(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Intento ${i + 1}/${retries} de conectar a MySQL...`);
      const [rows] = await db.query("SELECT NOW() AS now");
      console.log("✅ Conexión a MySQL exitosa → Hora del servidor:", rows[0].now);
      return true;
    } catch (error) {
      console.error(`❌ Error en intento ${i + 1}/${retries}`);
      console.error("Código:", error.code);
      console.error("Mensaje:", error.message);
      
      if (i < retries - 1) {
        console.log("⏳ Esperando 5 segundos antes de reintentar...");
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error("❌ Se agotaron los intentos de conexión");
      }
    }
  }
  return false;
}

testConnection();

export { db };
