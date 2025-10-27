import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Crear pool de conexiones usando las variables del .env
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // Requerido en Railway
  },
  connectTimeout: 10000,
});

// Probar la conexión
async function testConnection() {
  try {
    console.log("🔄 Intentando conectar a MySQL...");
    const [rows] = await db.query("SELECT NOW() AS now");
    console.log("✅ Conexión a MySQL exitosa → Hora del servidor:", rows[0].now);
  } catch (error) {
    console.error("❌ Error conectando a MySQL");
    console.error("Código:", error.code);
    console.error("Mensaje:", error.message);
  }
}

testConnection();

export { db };