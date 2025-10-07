const { Users, Rols } = require('../models');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const authController = {
  // 🔐 LOGIN mejorado con bcrypt
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log('📧 Intento de login con:', email);

      // Validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          status: 'Error', 
          message: 'Email y contraseña son requeridos' 
        });
      }

      // Buscar usuario por email incluyendo el rol
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

      // 🔥 VERIFICAR CONTRASEÑA CON BCRYPT
      let validPassword = false;
      
      // Verificar si la contraseña está en texto plano (usuarios antiguos) o encriptada
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        // Contraseña encriptada con bcrypt
        validPassword = await bcrypt.compare(password, user.password);
      } else {
        // Contraseña en texto plano - migrar a bcrypt
        validPassword = (user.password === password);
        if (validPassword) {
          // Migrar contraseña a bcrypt
          user.password = await bcrypt.hash(password, 10);
          await user.save();
          console.log('✅ Contraseña migrada a bcrypt para usuario:', email);
        }
      }

      if (!validPassword) {
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
        process.env.JWT_SECRET || 'mi_clave_secreta_retencion_711', 
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

  // 🔍 VERIFICAR TOKEN
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ 
          status: 'Error', 
          message: 'Token no proporcionado' 
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta_retencion_711');
      
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
  },

  // 📧 RECUPERAR CONTRASEÑA
  forgotPassword: async function (req, res) {
    try {
      const { email } = req.body;

      console.log('📧 Solicitando recuperación para:', email);
      console.log('🔐 Variables de entorno:');
      console.log('   EMAIL_FROM:', process.env.EMAIL_FROM ? '✅ Configurado' : '❌ NO configurado');
      console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configurado' : '❌ NO configurado');
      console.log('   FRONTEND_URL:', process.env.FRONTEND_URL);
      
      const user = await Users.findOne({
        where: { email: email }
      });
      
      if (!user) {
        console.log('❌ Usuario no encontrado para recuperación:', email);
        return res.status(404).json({ 
          status: 'Error', 
          message: 'Usuario no encontrado' 
        });
      }

      console.log('✅ Usuario encontrado:', user.email);

      // Generar token de restablecimiento
      const token = crypto.randomBytes(32).toString("hex");
      const expires = Date.now() + 1000 * 60 * 60; // 1 hora
      
      user.passwordResetToken = token;
      user.passwordResetExpires = new Date(expires);
      await user.save();

      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
      
      console.log('📤 Enviando correo de recuperación a:', email);
      console.log('   FROM:', process.env.EMAIL_FROM);
      console.log('   TO:', user.email);
      console.log('   RESET LINK:', resetLink);
      
      // Enviar correo electrónico
      await sendEmail({
        to: user.email,
        subject: "Recuperación de contraseña - Sistema de Retención SENA",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #008550;">Sistema de Retención SENA</h2>
            <p>Hola <strong>${user.firstName} ${user.lastName}</strong>,</p>

            <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>

            <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #008550; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Restablecer Contraseña
              </a>
            </div>

            <p>O también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #555;">${resetLink}</p>

            <p>Este enlace expirará en <strong>1 hora</strong>.</p>

            <hr style="margin-top: 40px;">
            <p style="font-size: 12px; color: #888;">Este mensaje fue generado automáticamente por el Sistema de Retención SENA. No respondas a este correo.</p>
          </div>
        `,
      });
      
      console.log('✅ Correo de recuperación enviado a:', email);
      
      return res.status(200).json({ 
        status: 'Ok', 
        message: 'Se ha enviado un correo para recuperar la contraseña' 
      });
      
    } catch (error) {
      console.error("💥 Error al enviar el correo de recuperación:", error);
      console.error("💥 Stack trace:", error.stack);

      return res.status(500).json({ 
        status: 'Error', 
        message: 'Error interno del servidor al procesar la recuperación',
        error: error.message // 👈 Esto ayuda a debug
      });
    }
  },

  // 🔄 RESTABLECER CONTRASEÑA
  resetPassword: async (req, res) => {
    const { newPassword, token } = req.body;
    
    console.log('🔄 Intentando restablecer contraseña con token:', token);
    
    try {
      const user = await Users.findOne({
        where: {
          passwordResetToken: token,
          passwordResetExpires: {
            [Op.and]: {
              [Op.ne]: null,
              [Op.gt]: new Date()
            }
          }
        }
      });

      // Verificar si el usuario existe y si el token es válido
      if (!user) {
        console.log('❌ Token inválido o expirado:', token);
        return res.status(404).json({ 
          status: 'Error', 
          message: 'El token de restablecimiento es inválido o ha expirado' 
        });
      }
      
      // Actualizar contraseña
      user.passwordResetToken = null;
      user.passwordResetExpires = null;
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      console.log('✅ Contraseña actualizada para usuario:', user.email);

      res.status(200).json({
        status: 'Ok', 
        message: 'Contraseña actualizada con éxito. Por favor, inicia sesión.' 
      });
      
    } catch (error) {
      console.error("💥 Error al restablecer la contraseña:", error);
      res.status(500).json({ 
        status: 'Error', 
        message: 'Error al cambiar la contraseña' 
      });
    }
  },

  // 👤 OBTENER USUARIO AUTENTICADO
  getUserAuthenticated: async function (req, res) {
    try {
      let data = req.headers.authorization.split(" ");
      
      if (data[0] === "Bearer") {
        let isValidToken = jwt.verify(data[1], process.env.JWT_SECRET || 'mi_clave_secreta_retencion_711');
        
        if (isValidToken) {
          return res.status(200).json({
            status: 'Ok',
            data: {
              user: isValidToken
            }
          });
        }
      } else {
        return res.status(400).json({
          status: 'Error',
          message: 'El token debe ser enviado junto a Bearer',
        });
      }
    } catch (error) {
      console.error('Error verificando usuario autenticado:', error);
      return res.status(500).json({ 
        status: 'Error', 
        message: 'Error interno del servidor' 
      });
    }
  }
};

module.exports = authController;