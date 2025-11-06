// Rutas para servicios y combos - Conectadas a base de datos MySQL del Salón Sandra Fajardo
import express from 'express';
import { servicioController } from '../controllers/servicioController.js';

const router = express.Router();

// ===== RUTAS PÚBLICAS =====

// 🔹 Rutas de COMBOS (más específicas primero)
router.get('/combos', servicioController.obtenerCombos);
router.get('/combos/:id', servicioController.obtenerComboPorId);

// 🔹 Rutas de SERVICIOS
router.get('/', servicioController.obtenerServicios);
router.get('/:id', servicioController.obtenerServicioPorId);

export default router;
