// ===============================
// Rutas para servicios y combos
// ===============================
import express from 'express';
const router = express.Router();
import { servicioController } from '../controllers/servicioController.js';

// ===== RUTAS PÚBLICAS =====

// 🔹 Primero los COMBOS (más específicos)
router.get('/combos', servicioController.obtenerCombos);
router.get('/combos/:id', servicioController.obtenerComboPorId);

// 🔹 Luego los SERVICIOS
router.get('/', servicioController.obtenerServicios);
router.get('/:id', servicioController.obtenerServicioPorId);

// 🔹 (Opcional: si en el futuro agregas POST, PUT, DELETE)
router.post('/', servicioController.crearServicio);
router.post('/combos', servicioController.crearCombo);
router.put('/:id', servicioController.actualizarServicio);
router.put('/combos/:id', servicioController.actualizarCombo);
router.delete('/:id', servicioController.eliminarServicio);
router.delete('/combos/:id', servicioController.eliminarCombo);

export default router;
