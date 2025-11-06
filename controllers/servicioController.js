// Controlador para manejar las operaciones de servicios y combos
import ServicioModel from '../models/servicioModel.js';

// Usando objeto literal en lugar de clase para mejor legibilidad
export const servicioController = {
  // Obtener todos los servicios
  obtenerServicios: async (req, res) => {
    console.log('🔍 Llamada a obtenerServicios recibida');
    try {
      // Respuesta de prueba directa
      return res.status(200).json({
        success: true,
        data: [
          { 
            id: 1, 
            nombre: 'Corte de Pelo', 
            precio: 150, 
            descripcion: 'Corte de pelo profesional',
            duracion: '30 min',
            tipo: 'servicio'
          },
          { 
            id: 2, 
            nombre: 'Tinte', 
            precio: 300, 
            descripcion: 'Tinte profesional',
            duracion: '60 min',
            tipo: 'servicio'
          }
        ],
        total: 2,
        mensaje: 'Servicios obtenidos exitosamente'
      });
    } catch (error) {
      console.error('❌ Error en obtenerServicios:', error);
      res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Obtener todos los combos
  obtenerCombos: async (req, res) => {
    console.log('🎁 Llamada a obtenerCombos recibida');
    try {
      // Respuesta de prueba directa
      return res.status(200).json({
        success: true,
        data: [
          { 
            id: 1, 
            nombre: 'Combo Belleza Completa', 
            precio: 400,
            descripcion: 'Corte + Tinte + Peinado',
            duracion: '120 min',
            tipo: 'combo',
            servicios_incluidos: [
              { id: 1, nombre: 'Corte de Pelo' },
              { id: 2, nombre: 'Tinte' },
              { id: 3, nombre: 'Peinado' }
            ]
          }
        ],
        total: 1,
        mensaje: 'Combos obtenidos exitosamente'
      });
    } catch (error) {
      console.error('❌ Error en obtenerCombos:', error);
      res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Obtener un servicio por ID
  obtenerServicioPorId: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          mensaje: 'ID de servicio inválido'
        });
      }

      console.log(`🔍 Obteniendo servicio con ID: ${id}`);
      
      // Respuesta de prueba
      return res.status(200).json({
        success: true,
        data: {
          id: parseInt(id),
          nombre: 'Corte de Pelo',
          precio: 150,
          descripcion: 'Corte de pelo profesional',
          duracion: '30 min',
          tipo: 'servicio'
        },
        mensaje: 'Servicio obtenido exitosamente'
      });
    } catch (error) {
      console.error('❌ Error al obtener servicio:', error);
      res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Obtener un combo por ID
  obtenerComboPorId: async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          mensaje: 'ID de combo inválido'
        });
      }

      console.log(`🔍 Obteniendo combo con ID: ${id}`);
      
      // Respuesta de prueba
      return res.status(200).json({
        success: true,
        data: {
          id: parseInt(id),
          nombre: 'Combo Belleza Completa',
          precio: 400,
          descripcion: 'Corte + Tinte + Peinado',
          duracion: '120 min',
          tipo: 'combo',
          servicios_incluidos: [
            { id: 1, nombre: 'Corte de Pelo' },
            { id: 2, nombre: 'Tinte' },
            { id: 3, nombre: 'Peinado' }
          ]
        },
        mensaje: 'Combo obtenido exitosamente'
      });
    } catch (error) {
      console.error('❌ Error al obtener combo:', error);
      res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

// Exportar tanto el objeto como default para compatibilidad
export default servicioController;
