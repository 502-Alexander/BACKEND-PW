import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Middlewares y rutas
import middlewares from '../middlewares/index.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import verificacionRoutes from '../routes/verificacionRoutes.js';
import productosRoutes from '../routes/productosRoutes.js';
import categoriasRoutes from '../routes/categoriasRoutes.js';
import carritoRoutes from '../routes/carritoRoutes.js';
import serviciosRoutes from '../routes/serviciosRoutes.js';
import uploadRoutes from '../routes/uploadRoutes.js';
import clienteRoutes from '../routes/clienteRoutes.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 4000;

// ===============================
// CONFIGURACIÓN DE CORS
// ===============================
const whitelist = process.env.CORS_ORIGIN.split(',');
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // curl o apps móviles
    if(whitelist.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// ===============================
// MIDDLEWARES
// ===============================
app.use(middlewares.security.helmetConfig);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(middlewares.security.sanitizeInput);
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// ===============================
// RUTAS
// ===============================
app.get('/', (req, res) => {
  res.json({
    mensaje: '🟢 API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, mensaje: 'Email y contraseña requeridos' });

    const adminEmail = 'admin@nuevatienda.com';
    const adminPassword = 'password';

    if(email === adminEmail && password === adminPassword){
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
    return res.status(500).json({ success: false, mensaje: 'Error interno del servidor' });
  }
});

// Rutas de API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/verificacion', verificacionRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/clientes', clienteRoutes);

// ===============================
// INICIALIZACIÓN DEL SERVIDOR
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend corriendo en http://localhost:${PORT}`);
  console.log(`🔧 Entorno: ${process.env.NODE_ENV}`);
});
