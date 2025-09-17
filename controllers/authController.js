const { Users, Rols } = require('../models');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log('📧 Intento de login con:', email);

      // Validar que vengan los campos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          status: 'Error', 
          message: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario por email incluyendo la información del rol
      const user = await Users.findOne({ 
        where: { email },
        include: [
          {
            model: Rols,
            as: 'rol',
            attributes: ['id', 'name']
          }
        ]
      });

      if (!user) {
        console.log('❌ Usuario no encontrado:', email);
        return res.status(401).json({ 
          status: 'Error', 
          message: 'Credenciales incorrectas' 
        });
      }

      // Verificar contraseña (en texto plano según tu BD actual)
      if (user.password !== password) {
        console.log('❌ Contraseña incorrecta para:', email);
        return res.status(401).json({ 
          status: 'Error', 
          message: 'Credenciales incorrectas' 
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          rol: user.rol.name,
          firstName: user.firstName,
          lastName: user.lastName
        }, 
        process.env.JWT_SECRET || 'mi_clave_secreta_bienestar', 
        { expiresIn: '24h' }
      );

      console.log('✅ Login exitoso para:', email);

      // Devolver respuesta exitosa
      res.status(200).json({
        status: 'Ok',
        message: 'Login exitoso',
        data: {
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            document: user.document,
            coordinadorType: user.coordinadorType,
            manager: user.manager,
            fkIdRols: user.fkIdRols,
            rol: user.rol
          }
        }
      });

    } catch (error) {
      console.error('💥 Error en login:', error);
      res.status(500).json({ 
        status: 'Error', 
        message: 'Error interno del servidor' 
      });
    }
  },

  // Opcional: Endpoint para verificar token
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ 
          status: 'Error', 
          message: 'Token no proporcionado' 
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta_bienestar');
      
      res.status(200).json({
        status: 'Ok',
        message: 'Token válido',
        data: decoded
      });

    } catch (error) {
      console.error('Error verificando token:', error);
      res.status(401).json({ 
        status: 'Error', 
        message: 'Token inválido o expirado' 
      });
    }
  }
};

module.exports = authController;