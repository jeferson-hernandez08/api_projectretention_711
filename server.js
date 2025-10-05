const express = require('express')
const app     = express()
const bodyParser = require('body-parser');     // Importar body-parser para manejar datos JSON
const cors = require('cors');                  // 👈 Importa CORS

//********CORS MEJORADO *******/
// // 🔥 Configuración MEJORADA de CORS
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Lista de dominios permitidos
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'http://localhost:8080',
//       'http://localhost:64520',      // 👈 ¡AGREGA ESTE! // Puerto de Flutter web
//       'http://127.0.0.1:3000',
//       'http://127.0.0.1:8080',
//       'http://127.0.0.1:64520',      // 👈 ¡AGREGA ESTE! // Puerto de Flutter web
//       'https://your-flutter-web-domain.com',
//       'http://localhost',            // Para requests sin puerto
//       'http://127.0.0.1'             // Para requests sin puerto
//     ];

//     console.log('🌐 Origin de la petición:', origin); // 🔥 Para debugging
    
//     // Permitir requests sin origen (como apps móviles, Postman, etc.)
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       console.log('❌ Origen no permitido:', origin);
//       callback(new Error('No permitido por CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: [
//     'Content-Type', 
//     'Authorization', 
//     'X-Requested-With',
//     'Accept',
//     'Origin',
//     'User-Agent'  // 🔥 Agregado para Flutter
//   ],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// // 🔥 Usar SOLO una configuración de CORS
// app.use(cors(corsOptions));

// // Middleware para preflight requests
// app.options('*', cors(corsOptions));

//********CORS BASICO *******/
//Uso de cors 👇🏼
app.use(cors());

// Configurar el puerto (usa variable de entorno o 4080 por defecto)
app.set('PORT', process.env.PORT || 4000)

//Middleware para registrar las peticiones HTTP
app.use(bodyParser.urlencoded({ extended: false })); // Middleware para recibir datos desde un formulario
app.use(bodyParser.json());                          // Para que el servidor pueda recibir formato Json

// 🔥 NUEVA RUTA TEMPORAL PARA RESET PASSWORD (DESPUÉS de CORS y bodyParser)
app.get('/reset-password', (req, res) => {
  const token = req.query.token;
  
  if (!token) {
    return res.status(400).send(`
      <html>
        <body>
          <h2>Error: Token no proporcionado</h2>
          <p>El enlace de recuperación es inválido.</p>
        </body>
      </html>
    `);
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restablecer Contraseña - SENA Retention</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #071955 0%, #17d6d6 100%);
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .container {
                background-color: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                width: 100%;
                max-width: 450px;
            }
            h2 {
                color: #008550;
                text-align: center;
                margin-bottom: 30px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            input {
                width: 100%;
                padding: 15px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
                margin-bottom: 15px;
            }
            input:focus {
                border-color: #008550;
                outline: none;
            }
            button {
                width: 100%;
                background: linear-gradient(135deg, #071955 0%, #17d6d6 100%);
                color: white;
                padding: 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 10px;
            }
            button:hover {
                opacity: 0.9;
            }
            .message {
                text-align: center;
                margin-top: 20px;
                padding: 10px;
                border-radius: 5px;
                display: none;
            }
            .success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <h2 style="color: #071955;">Sistema de Retención SENA</h2>
            </div>
            <h2>Restablecer Contraseña</h2>
            <form id="resetForm">
                <input type="hidden" id="token" value="${token}">
                <div class="form-group">
                    <input type="password" id="newPassword" placeholder="Nueva contraseña" required minlength="6">
                </div>
                <div class="form-group">
                    <input type="password" id="confirmPassword" placeholder="Confirmar contraseña" required minlength="6">
                </div>
                <button type="submit">RESTABLECER CONTRASEÑA</button>
            </form>
            <div id="message" class="message"></div>
        </div>

        <script>
            document.getElementById('resetForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const token = document.getElementById('token').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const messageDiv = document.getElementById('message');
                
                // Validaciones
                if (newPassword !== confirmPassword) {
                    showMessage('Las contraseñas no coinciden.', 'error');
                    return;
                }
                
                if (newPassword.length < 6) {
                    showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
                    return;
                }
                
                try {
                    const response = await fetch('/api/v1/auth/resetPassword', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            newPassword: newPassword,
                            token: token
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        showMessage('¡Contraseña restablecida con éxito! Ahora puedes iniciar sesión con tu nueva contraseña.', 'success');
                        document.getElementById('resetForm').reset();
                        document.getElementById('resetForm').style.display = 'none';
                    } else {
                        showMessage(data.message || 'Error al restablecer la contraseña.', 'error');
                    }
                } catch (error) {
                    showMessage('Error de conexión. Intenta nuevamente.', 'error');
                }
            });
            
            function showMessage(text, type) {
                const messageDiv = document.getElementById('message');
                messageDiv.textContent = text;
                messageDiv.className = 'message ' + type;
                messageDiv.style.display = 'block';
                
                // Auto-ocultar después de 5 segundos si es éxito
                if (type === 'success') {
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 5000);
                }
            }
        </script>
    </body>
    </html>
  `);
});

//------
app.get('/',(request, response)=>{
    response.send({
        message: "API Activa | En Funcionamiento"
    })
})

// Rutas del api
app.use('/api/v1/trainingPrograms', require('./api/v1/trainingProgram.routes'));   // Ruta para programas de formacion
app.use('/api/v1/groups', require('./api/v1/group.routes'));                       // Ruta para grupos
app.use('/api/v1/apprentices', require('./api/v1/apprentice.routes'));             // Ruta para aprendices
app.use('/api/v1/rols', require('./api/v1/rol.routes'));                           // Ruta para roles
app.use('/api/v1/users', require('./api/v1/user.routes'));                         // Ruta para usuarios
app.use('/api/v1/reports', require('./api/v1/report.routes'));                     // Ruta para reportes
app.use('/api/v1/categories', require('./api/v1/category.routes'));                // Ruta para categorias
app.use('/api/v1/causes', require('./api/v1/cause.routes'));                       // Ruta para causas
app.use('/api/v1/strategies', require('./api/v1/strategy.routes'));                // Ruta para estrategias
app.use('/api/v1/interventions', require('./api/v1/intervention.routes'));         // Ruta para intervenciones
app.use('/api/v1/causesReports', require('./api/v1/causeReport.routes'));          // Ruta para causas reportes
app.use('/api/v1/auth', require('./api/v1/auth.routes'));                          // Ruta para autenticación Login

// Ruta para categories (Prueba)
//app.use('/api/categories', require('./api/categories'));    // Ruta para categorias

app.listen(app.get('PORT'), ()=>{
    console.log(`🚀 Servidor corriendo en el PUERTO: ${app.get('PORT')}`)
    console.log(`🌐 URL de acceso: http://localhost:${app.get('PORT')}`)
    console.log(`🔧 CORS configurado para desarrollo`)
    console.log(`🔐 Ruta de autenticación: http://localhost:${app.get('PORT')}/api/v1/auth/login`) 
    console.log(`🔄 Ruta de reset password: http://localhost:${app.get('PORT')}/reset-password`) 
})