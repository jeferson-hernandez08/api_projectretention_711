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

  // 📧 RECUPERAR CONTRASEÑA - USANDO SENDGRID API DIRECTAMENTE
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      
      console.log(`📧 Solicitando recuperación para: ${email}`);
      console.log('🔐 Variables de entorno verificadas:');
      console.log(`   SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? '✅ Configurado' : '❌ No configurado'}`);
      console.log(`   EMAIL_FROM: ${process.env.EMAIL_FROM ? '✅ Configurado' : '❌ No configurado'}`);
      console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL ? '✅ Configurado' : '❌ No configurado'}`);
      
      // Verificar que tenemos la API key de SendGrid
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY no está configurada');
      }

      // Buscar usuario
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        console.log('❌ Usuario no encontrado');
        return res.status(404).json({
          status: 'Error',
          message: 'Usuario no encontrado'
        });
      }

      console.log(`✅ Usuario encontrado: ${user.email}`);

      // Generar token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

      // Guardar token en usuario
      await user.update({
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpires
      });

      // Configurar SendGrid
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      // Crear enlace de reset
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      // Configurar email
      const msg = {
        to: email,
        from: process.env.EMAIL_FROM, // Debe estar verificado en SendGrid
        subject: 'Recuperación de contraseña - Sistema de Retención SENA',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2E86AB;">Recuperación de Contraseña</h2>
            <p>Hola ${user.firstName},</p>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
            <a href="${resetLink}" 
              style="background-color: #2E86AB; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Restablecer Contraseña
            </a>
            <p><strong>Este enlace expirará en 1 hora.</strong></p>
            <p>Si no solicitaste este cambio, ignora este mensaje.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Sistema de Retención de Aprendices - SENA
            </p>
          </div>
        `
      };

      console.log('📤 Intentando enviar email con SendGrid API...');
      console.log(`   FROM: ${process.env.EMAIL_FROM}`);
      console.log(`   TO: ${email}`);
      console.log(`   RESET LINK: ${resetLink}`);
      
      // Enviar email usando la API de SendGrid
      await sgMail.send(msg);
      
      console.log('✅ Email de recuperación enviado exitosamente');
      
      return res.status(200).json({
        status: 'Success',
        message: 'Email de recuperación enviado exitosamente'
      });

    } catch (error) {
      console.error('💥 Error enviando correo con SendGrid:', error);
      
      // Información más detallada del error
      if (error.response) {
        console.error('💥 SendGrid API Error Details:', {
          statusCode: error.response.status,
          body: error.response.body,
          headers: error.response.headers
        });
      }
      
      return res.status(500).json({
        status: 'Error',
        message: 'Error interno del servidor al procesar la recuperación',
        error: error.message
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