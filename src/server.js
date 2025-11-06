import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';

dotenv.config();

import middlewares from '../middlewares/index.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import verificacionRoutes from '../routes/verificacionRoutes.js';
import productosRoutes from '../routes/productosRoutes.js';
import categoriasRoutes from '../routes/categoriasRoutes.js';
import carritoRoutes from '../routes/carritoRoutes.js';
import serviciosRoutes from '../routes/serviciosRoutes.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import clienteRoutes from '../routes/clienteRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// ===============================
// CONFIGURACIÓN DE CORS
// ===============================
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : [];

console.log('🌍 CORS_ORIGIN permitidos:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(domain =>
      origin === domain || origin.startsWith(domain)
    );

    if (isAllowed) {
      return callback(null, true);
    }

    console.warn('⚠️ Intento de acceso no permitido por CORS:', origin);
    return callback(new Error('No permitido por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight

// ===============================
// MIDDLEWARES
// ===============================
app.use(middlewares.security.helmetConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(middlewares.security.sanitizeInput);
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Logging básico
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.originalUrl}`);
  next();
});

// ===============================
// RUTA BASE
// ===============================
app.get('/', (req, res) => {
  res.json({
    mensaje: '🟢 API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ===============================
// LOGIN ADMIN SIMPLIFICADO
// ===============================
app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, mensaje: 'Email y contraseña requeridos' });

    const adminEmail = 'admin@nuevatienda.com';
    const adminPassword = 'password';

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { id: 1, email: adminEmail, rol: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ success: true, mensaje: 'Login exitoso', token });
    } else {
      return res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('❌ Error en login de admin:', error);
    res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
  }
});

// ===============================
// RUTAS DE API
// ===============================
// ⚠️ Asegúrate de que serviciosRoutes tenga combos ANTES que :id
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/verificacion', verificacionRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/clientes', clienteRoutes);

// ===============================
// RUTAS NO EXISTENTES (404)
// ===============================
app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(404).json({
    success: false,
    mensaje: `Ruta no encontrada: ${req.originalUrl}`
  });
});

// ===============================
// MANEJO GLOBAL DE ERRORES
// ===============================
app.use((err, req, res, next) => {
  console.error('🔥 Error no manejado:', err.message);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ===============================
// INICIALIZACIÓN DEL SERVIDOR
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🔧 Entorno: ${process.env.NODE_ENV}`);
});
