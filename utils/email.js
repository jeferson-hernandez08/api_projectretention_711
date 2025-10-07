const nodemailer = require("nodemailer");

console.log('📧 Configurando nodemailer...');
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Presente' : '❌ Ausente');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar la configuración del transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Error configurando nodemailer:', error);
  } else {
    console.log('✅ Servidor de correo listo para enviar mensajes');
  }
});

/**
 * Envía un correo electrónico con opciones dinámicas.
 * @param {Object} options - Opciones del correo.
 * @param {string} options.to - Destinatario.
 * @param {string} options.subject - Asunto del correo.
 * @param {string} [options.text] - Texto plano del mensaje.
 * @param {string} [options.html] - Contenido HTML del mensaje.
 * @returns {Promise}
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log('📤 Intentando enviar email...');
    console.log('   To:', to);
    console.log('   Subject:', subject);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    console.log('   Mail options configuradas');

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado exitosamente:", info.response);
    return info;
    
  } catch (error) {
    console.error("💥 Error CRÍTICO enviando correo:", error);
    console.error("💥 Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    throw error; // Re-lanzar el error para manejarlo en el controller
  }
};

module.exports = sendEmail;