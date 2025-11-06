import db from '../database/ConexionBDD.js';

export const servicioController = {
  // Obtener todos los servicios
  async obtenerServicios(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM servicios');
      if (rows.length === 0) {
        return res.status(200).json({ servicios: [] });
      }
      res.status(200).json({ servicios: rows });
    } catch (error) {
      console.error('❌ Error en obtenerServicios:', error);
      res.status(500).json({ error: 'Error al obtener servicios' });
    }
  },

  // Obtener servicio por ID
  async obtenerServicioPorId(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query('SELECT * FROM servicios WHERE id = ?', [id]);
      if (rows.length === 0)
        return res.status(404).json({ error: 'Servicio no encontrado' });
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      console.error('❌ Error en obtenerServicioPorId:', error);
      res.status(500).json({ error: 'Error al obtener el servicio' });
    }
  },

  // Obtener todos los combos
  async obtenerCombos(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM combos');
      if (rows.length === 0) {
        return res.status(200).json({ combos: [] });
      }
      res.status(200).json({ combos: rows });
    } catch (error) {
      console.error('❌ Error en obtenerCombos:', error);
      res.status(500).json({ error: 'Error al obtener combos' });
    }
  },

  // Obtener combo por ID
  async obtenerComboPorId(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query('SELECT * FROM combos WHERE id = ?', [id]);
      if (rows.length === 0)
        return res.status(404).json({ error: 'Combo no encontrado' });
      res.status(200).json({ data: rows[0] });
    } catch (error) {
      console.error('❌ Error en obtenerComboPorId:', error);
      res.status(500).json({ error: 'Error al obtener el combo' });
    }
  },

  // Crear servicio
  async crearServicio(req, res) {
    try {
      const { nombre, precio, descripcion } = req.body;
      await db.query(
        'INSERT INTO servicios (nombre, precio, descripcion) VALUES (?, ?, ?)',
        [nombre, precio, descripcion]
      );
      res.status(201).json({ message: 'Servicio creado correctamente' });
    } catch (error) {
      console.error('❌ Error en crearServicio:', error);
      res.status(500).json({ error: 'Error al crear servicio' });
    }
  },

  // Crear combo
  async crearCombo(req, res) {
    try {
      const { nombre, precio, descripcion } = req.body;
      await db.query(
        'INSERT INTO combos (nombre, precio, descripcion) VALUES (?, ?, ?)',
        [nombre, precio, descripcion]
      );
      res.status(201).json({ message: 'Combo creado correctamente' });
    } catch (error) {
      console.error('❌ Error en crearCombo:', error);
      res.status(500).json({ error: 'Error al crear combo' });
    }
  },

  // Actualizar servicio
  async actualizarServicio(req, res) {
    try {
      const { id } = req.params;
      const { nombre, precio, descripcion } = req.body;
      await db.query(
        'UPDATE servicios SET nombre=?, precio=?, descripcion=? WHERE id=?',
        [nombre, precio, descripcion, id]
      );
      res.status(200).json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error en actualizarServicio:', error);
      res.status(500).json({ error: 'Error al actualizar servicio' });
    }
  },

  // Actualizar combo
  async actualizarCombo(req, res) {
    try {
      const { id } = req.params;
      const { nombre, precio, descripcion } = req.body;
      await db.query(
        'UPDATE combos SET nombre=?, precio=?, descripcion=? WHERE id=?',
        [nombre, precio, descripcion, id]
      );
      res.status(200).json({ message: 'Combo actualizado correctamente' });
    } catch (error) {
      console.error('❌ Error en actualizarCombo:', error);
      res.status(500).json({ error: 'Error al actualizar combo' });
    }
  },

  // Eliminar servicio
  async eliminarServicio(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM servicios WHERE id=?', [id]);
      res.status(200).json({ message: 'Servicio eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error en eliminarServicio:', error);
      res.status(500).json({ error: 'Error al eliminar servicio' });
    }
  },

  // Eliminar combo
  async eliminarCombo(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM combos WHERE id=?', [id]);
      res.status(200).json({ message: 'Combo eliminado correctamente' });
    } catch (error) {
      console.error('❌ Error en eliminarCombo:', error);
      res.status(500).json({ error: 'Error al eliminar combo' });
    }
  },
};
