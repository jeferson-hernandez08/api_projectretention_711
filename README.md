<div align="center">

<img src="public/img/logoSenaProyect3.png" alt="SENA Contigo Logo" width="200"/>

# 🎓 SENA Contigo — API REST
### Backend · Plataforma de Apoyo y Retención de Aprendices

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)
[![Version](https://img.shields.io/badge/Versión-2.0-blue?style=for-the-badge)](https://github.com/jeferson-hernandez08/api_projectretention_711)

*API REST · Node.js + Express · MVC + Services · Sequelize ORM · PostgreSQL*

[🌐 API en producción](https://api-projectretention-711.onrender.com/) · [📋 Documentación](#-documentación-de-endpoints) · [🐛 Reportar bug](../../issues) · [💡 Solicitar feature](../../issues)

</div>

---

## 📌 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Ecosistema SENA Contigo](#-ecosistema-sena-contigo)
- [Arquitectura](#-arquitectura)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación de Endpoints](#-documentación-de-endpoints)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#️-variables-de-entorno)
- [Base de Datos](#-base-de-datos)
- [Despliegue en Render](#-despliegue-en-render)
- [Seguridad](#-seguridad)
- [Equipo](#-equipo)

---

## 🎯 Sobre el Proyecto

La **API REST de SENA Contigo** es el núcleo backend del sistema de retención estudiantil del **Centro de Procesos Industriales y Construcción (CPIC) del SENA**. Centraliza toda la lógica de negocio, el acceso a la base de datos PostgreSQL y la comunicación con los clientes (aplicación móvil Flutter y plataforma web PHP).

Esta API fue construida sobre **Node.js + Express**, siguiendo una arquitectura **MVC extendida con capa de Servicios**, y utiliza **Sequelize** como ORM para gestionar las migraciones, modelos y seeders de la base de datos, priorizando la escalabilidad, la mantenibilidad y la seguridad del sistema.

**URL de producción:**
```
https://api-projectretention-711.onrender.com/
```

> 💡 **Versión 2.0 — ApiRest + Flutter.** Esta versión evoluciona el sistema hacia una arquitectura orientada a múltiples clientes, permitiendo consumo desde apps móviles, web y servicios externos.

---

## 🌐 Ecosistema SENA Contigo

Este repositorio forma parte de un ecosistema de múltiples proyectos interconectados:

| Repositorio | Tecnología | Descripción |
|---|---|---|
| **`api_projectretention_711`** *(este repo)* | Node.js + Express | API REST — Backend central y base de datos |
| `projectRetencion` | PHP + MVC | Plataforma web de administración |
| `sena-contigo-app` | Flutter | Aplicación móvil para instructores y aprendices |

---

## 🏗 Arquitectura

La API implementa una arquitectura **MVC extendida con capa de Servicios**, donde la Vista tradicional es reemplazada por respuestas **JSON** consumidas por clientes externos.

```
┌─────────────────────────────────────────────────────────────┐
│               CLIENTES (HTTP / HTTPS + JSON)                │
│         Flutter App  ·  Web PHP  ·  Postman / Insomnia      │
└────────────────────────┬────────────────────────────────────┘
                         │  Solicitudes HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              API REST  —  server.js (Express)               │
│         Middlewares: CORS · JSON · Morgan · JWT             │
└──────┬────────────────────────────────────────┬────────────┘
       │                                        │
       ▼                                        ▼
┌──────────────┐                    ┌───────────────────────┐
│   RUTAS      │                    │     UTILIDADES        │
│  api/v1/     │                    │    utils/email.js     │
│  (Endpoints) │                    │   (Nodemailer)        │
└──────┬───────┘                    └───────────────────────┘
       │
       ▼
┌──────────────────────┐
│    CONTROLADORES     │  ← Recibe req, valida, retorna JSON
│    controllers/      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      SERVICIOS       │  ← Lógica de negocio / CRUDs
│      services/       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MODELOS        │  ← Entidades definidas con Sequelize
│       models/        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐      ┌─────────────────────────────┐
│   SEQUELIZE ORM      │─────►│   BASE DE DATOS             │
│ Migraciones·Seeders  │      │   PostgreSQL (Render)       │
└──────────────────────┘      └─────────────────────────────┘
```

### Flujo de una solicitud

```
Cliente → [HTTP Request] → Ruta (api/v1) → Middleware JWT
→ Controlador (valida entrada) → Servicio (lógica de negocio)
→ Modelo Sequelize (consulta ORM) → PostgreSQL
→ [JSON Response] → Cliente
```

---

## 🛠 Tecnologías Usadas

### Runtime & Framework

| Tecnología | Versión | Descripción |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | 18+ | Entorno de ejecución JavaScript del lado del servidor |
| ![Express.js](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) | 4.x | Framework minimalista para construir la API REST |

### Base de Datos & ORM

| Tecnología | Versión | Descripción |
|---|---|---|
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) | 14+ | Sistema de gestión de base de datos relacional |
| ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white) | 6.x | ORM para Node.js — gestiona modelos, migraciones y seeders |
| **pg / pg-hstore** | latest | Driver de PostgreSQL requerido por Sequelize |

> 🔑 **Sequelize** actúa como intermediario entre la API y PostgreSQL, permitiendo definir los modelos como clases JavaScript, versionar la estructura de la base de datos mediante migraciones, y poblarla con seeders de forma controlada — sin escribir SQL en crudo para la gestión del esquema.

### Seguridad & Autenticación

| Librería | Descripción |
|---|---|
| **jsonwebtoken (JWT)** | Autenticación stateless mediante tokens firmados |
| **bcrypt** | Hashing seguro de contraseñas |
| **cors** | Control de acceso entre dominios (Cross-Origin) |
| **dotenv** | Gestión segura de variables de entorno |

### Comunicación & Utilidades

| Librería | Descripción |
|---|---|
| **Nodemailer** | Envío de correos electrónicos (notificaciones, recuperación de contraseña) |
| **Morgan** | Logger de solicitudes HTTP para depuración |

### Infraestructura & Despliegue

| Tecnología | Descripción |
|---|---|
| ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) | Contenedorización de la aplicación |
| ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black) | Plataforma cloud para hosting de la API y PostgreSQL |
| **npm** | Gestor de paquetes y scripts del proyecto |

### Herramientas de Desarrollo

| Herramienta | Descripción |
|---|---|
| **Sequelize CLI** | Generación y ejecución de migraciones y seeders desde consola |
| **Postman / Insomnia** | Testing y documentación de endpoints |
| **DBeaver** | Gestión visual de la base de datos PostgreSQL |
| **nodemon** | Reinicio automático del servidor en desarrollo |
| **Git** | Control de versiones |

---

## 📁 Estructura del Proyecto

```
api_projectretention_711/
│
├── api/
│   └── v1/                     # Endpoints organizados por versión
│       ├── auth.routes.js
│       ├── users.routes.js
│       ├── aprendices.routes.js
│       ├── reportes.routes.js
│       ├── intervenciones.routes.js
│       └── ...
│
├── config/
│   └── config.json             # Configuración de Sequelize (BD por entorno: dev/test/prod)
│
├── controllers/                # Controladores MVC — gestión de solicitudes HTTP
│   ├── authController.js
│   ├── usersController.js
│   ├── aprendicesController.js
│   ├── reportesController.js
│   └── ...
│
├── services/                   # Lógica de negocio — CRUDs y reglas del sistema
│   ├── authService.js
│   ├── usersService.js
│   ├── aprendicesService.js
│   └── ...
│
├── models/                     # Modelos Sequelize — representan las tablas de la BD
│   ├── index.js                # Inicialización de Sequelize y asociaciones
│   ├── userModel.js
│   ├── aprendizModel.js
│   ├── reporteModel.js
│   └── ...
│
├── database/
│   └── schema.sql              # Backup del esquema de la base de datos
│
├── migrations/                 # Migraciones Sequelize — versionado del esquema de BD
│   ├── 001_create_users.js
│   └── ...
│
├── seeders/                    # Seeders Sequelize — datos iniciales y de prueba
│   ├── 01_users.js
│   ├── 02_programas.js
│   └── ...
│
├── utils/
│   └── email.js                # Utilidad de envío de correos (Nodemailer)
│
├── node_modules/               # Dependencias instaladas (npm)
│
├── server.js                   # Punto de entrada principal de la API
├── reset-db.js                 # Script para reiniciar la base de datos
├── .sequelizerc                # Configuración de rutas para Sequelize CLI
├── package.json                # Dependencias y scripts del proyecto
├── package-lock.json           # Lock de versiones de dependencias
├── Dockerfile                  # Configuración Docker para despliegue
├── .env.example                # Plantilla de variables de entorno
└── README.md                   # Este archivo
```

---

## 📡 Documentación de Endpoints

La API está versionada bajo `/api/v1/`. Todos los endpoints protegidos requieren el header de autorización JWT.

**Base URL:**
```
https://api-projectretention-711.onrender.com/api/v1
```

### 🔐 Autenticación

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/auth/login` | Iniciar sesión — retorna JWT | ❌ |
| `POST` | `/auth/recovery` | Solicitar recuperación de contraseña | ❌ |
| `POST` | `/auth/reset-password` | Restablecer contraseña con token | ❌ |

### 👥 Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/usuarios` | Listar todos los usuarios | ✅ Admin |
| `GET` | `/usuarios/:id` | Obtener usuario por ID | ✅ |
| `POST` | `/usuarios` | Crear nuevo usuario | ✅ Admin |
| `PUT` | `/usuarios/:id` | Actualizar usuario | ✅ Admin |
| `DELETE` | `/usuarios/:id` | Eliminar usuario | ✅ Admin |

### 🎓 Aprendices

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/aprendices` | Listar aprendices | ✅ |
| `GET` | `/aprendices/:id` | Obtener aprendiz por ID | ✅ |
| `POST` | `/aprendices` | Registrar aprendiz | ✅ |
| `PUT` | `/aprendices/:id` | Actualizar aprendiz | ✅ |
| `DELETE` | `/aprendices/:id` | Eliminar aprendiz | ✅ Admin |

### 📋 Reportes e Intervenciones

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/reportes` | Listar reportes de riesgo | ✅ |
| `POST` | `/reportes` | Crear reporte de riesgo | ✅ Instructor |
| `GET` | `/intervenciones` | Listar intervenciones | ✅ |
| `POST` | `/intervenciones` | Registrar intervención | ✅ |
| `PUT` | `/intervenciones/:id` | Actualizar intervención | ✅ |

### 📚 Programas y Grupos

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `GET` | `/programas` | Listar programas de formación | ✅ |
| `GET` | `/grupos` | Listar grupos / fichas | ✅ |
| `POST` | `/programas` | Crear programa | ✅ Admin |
| `POST` | `/grupos` | Crear grupo | ✅ Admin |

> 📌 **Formato de respuesta:** Todas las respuestas son en `application/json`.
>
> **Header de autenticación requerido en endpoints protegidos:**
> ```
> Authorization: Bearer <token_jwt>
> ```

---

## ⚙️ Requisitos del Sistema

### Software

| Requisito | Versión mínima |
|---|---|
| **Node.js** | 18.x o superior |
| **npm** | 8.x o superior |
| **PostgreSQL** | 14 o superior |
| **Sequelize CLI** | `npm install -g sequelize-cli` |
| **Git** | Cualquier versión reciente |
| **Docker** | Opcional — para despliegue en contenedor |

### Hardware recomendado (producción)

| Componente | Mínimo recomendado |
|---|---|
| **CPU** | 2 núcleos |
| **RAM** | 4 GB |
| **Almacenamiento** | 20 GB SSD |

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/jeferson-hernandez08/api_projectretention_711.git
cd api_projectretention_711
```

### 2. Instalar dependencias

```bash
npm install
```

Instalará automáticamente: `express`, `sequelize`, `pg`, `pg-hstore`, `dotenv`, `cors`, `nodemailer`, `jsonwebtoken`, `bcrypt`, `morgan` y más.

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus datos reales (ver sección [Variables de Entorno](#️-variables-de-entorno)).

### 4. Configurar Sequelize — conexión a PostgreSQL

Edita `config/config.json`. Sequelize usa este archivo para conectarse según el entorno (`development`, `test`, `production`):

```json
{
  "development": {
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "database": "sena_contigo",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "tu_usuario",
    "password": "tu_contraseña",
    "database": "sena_contigo",
    "host": "tu-host.render.com",
    "port": 5432,
    "dialect": "postgres",
    "ssl": true
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "ssl": true
  }
}
```

> 💡 En producción (Render), Sequelize lee directamente desde `DATABASE_URL`, evitando exponer credenciales en el archivo.

### 5. Ejecutar migraciones con Sequelize

Las migraciones crean todas las tablas de forma ordenada y versionada:

```bash
# Ejecutar todas las migraciones pendientes
npx sequelize-cli db:migrate

# O con el script del proyecto
npm run migrate
```

### 6. Poblar la base de datos con seeders

> ⚠️ Ejecutar **solo una vez**. Después de poblar, remueve el comando de seeders del script de inicio para evitar duplicados.

```bash
# Ejecutar todos los seeders
npx sequelize-cli db:seed:all

# O con el script del proyecto
npm run seed
```

### 7. Iniciar el servidor

**Modo desarrollo** (con nodemon — recarga automática):
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
# o directamente:
node server.js
```

La API estará disponible en: **`http://localhost:4000`**

Verifica accediendo a:
```
http://localhost:4000/api/v1/
```

---

## 🗝️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Servidor
PORT=4000
NODE_ENV=development

# Base de Datos PostgreSQL — usada por Sequelize en producción
DATABASE_URL=postgresql://usuario:contraseña@host:5432/sena_contigo

# Autenticación JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=24h

# Correo electrónico (Nodemailer)
MAIL_HOST=smtp.tuservidor.com
MAIL_PORT=587
MAIL_USER=tu_correo@dominio.com
MAIL_PASS=tu_contraseña_correo
MAIL_FROM="SENA Contigo <noreply@senacontigo.com>"
```

> ⚠️ **Nunca subas el archivo `.env` al repositorio.** Está incluido en el `.gitignore`.

---

## 🗄️ Base de Datos

El sistema usa **PostgreSQL** desplegado en **Render**, gestionado completamente a través de **Sequelize ORM**. El esquema se define y versiona mediante migraciones, y los datos iniciales se insertan con seeders — todo sin escribir SQL en crudo para la gestión del esquema.

### Entidades del modelo relacional

| Tabla | Descripción |
|---|---|
| `usuarios` | Coordinadores, instructores, bienestar, aprendices voceros |
| `programas` | Programas de formación técnica y tecnológica |
| `grupos` | Fichas de aprendizaje por programa |
| `aprendices` | Registro completo de cada aprendiz |
| `categorias` | Categorías de riesgo de deserción |
| `causas` | Causas específicas (académicas, personales, familiares) |
| `reportes` | Reportes de riesgo registrados por instructores |
| `intervenciones` | Acciones de apoyo aplicadas por aprendiz |
| `estrategias` | Estrategias de intervención disponibles |

### Comandos Sequelize CLI

```bash
# Crear todas las tablas (migraciones)
npx sequelize-cli db:migrate

# Revertir la última migración
npx sequelize-cli db:migrate:undo

# Revertir todas las migraciones
npx sequelize-cli db:migrate:undo:all

# Ejecutar seeders (datos iniciales — solo una vez)
npx sequelize-cli db:seed:all

# Resetear la base de datos desde cero
node reset-db.js
```

### Visualizar con DBeaver

Conéctate a la base de datos PostgreSQL de Render desde DBeaver usando la **External Database URL** del panel de Render:

```
postgresql://usuario:contraseña@hostname.render.com:5432/nombre_bd
```

---

## ☁️ Despliegue en Render

### Paso a paso

**1.** Sube el código a GitHub y haz commit + push de todos los cambios.

**2.** En [Render](https://render.com), crea un nuevo **Web Service** y conecta el repositorio.

**3.** Configura el servicio:

| Campo | Valor |
|---|---|
| Environment | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Port | `4000` |

**4.** Crea una base de datos **PostgreSQL** en Render (New → PostgreSQL). Copia la **External Database URL**.

**5.** Agrega todas las variables de entorno en el panel de Render: `DATABASE_URL`, `JWT_SECRET`, credenciales de correo, etc.

**6.** Agrega `NODE_ENV=test` para que Sequelize use el entorno correcto y ejecute las migraciones al iniciar.

**7.** Haz **Deploy** — Render construirá e iniciará la API. Sequelize migrará automáticamente la BD en el arranque.

**8.** Para actualizaciones: haz `git push` y en Render presiona **"Deploy latest commit"**.

### Con Docker (local)

```bash
# Construir imagen
docker build -t sena-contigo-api .

# Correr contenedor
docker run -p 4000:4000 --env-file .env sena-contigo-api
```

> 📄 Para el proceso completo paso a paso, consulta: **"Documentación de Despliegue del Sistema en Render con Docker"**

---

## 🔒 Seguridad

### Autenticación con JWT

```
POST /api/v1/auth/login
→ Genera token JWT firmado con JWT_SECRET
→ El cliente lo envía en cada petición protegida:
   Authorization: Bearer <token>
```

Los tokens tienen expiración configurable mediante `JWT_EXPIRES_IN`.

### Autorización por Roles

Cada endpoint protegido verifica el rol mediante middleware:

```javascript
router.get('/usuarios', verifyToken, isAdmin, controller.getUsers);
```

| Rol | Permisos |
|---|---|
| **Administrador** | Acceso total al sistema |
| **Coordinador** | Programas, grupos y reportes globales |
| **Instructor** | Reportes e intervenciones de su grupo |
| **Prof. Bienestar** | Estrategias y seguimiento de aprendices |
| **Aprendiz Vocero** | Solo visualización de información |

### Resumen de medidas implementadas

| Medida | Descripción |
|---|---|
| **bcrypt** | Contraseñas como hash seguro, nunca en texto plano |
| **Sequelize ORM** | Prevención de SQL Injection mediante consultas parametrizadas |
| **CORS configurado** | Control estricto de dominios autorizados |
| **Variables de entorno** | Credenciales fuera del código fuente |
| **HTTPS** | Comunicación cifrada en producción (TLS via Render) |
| **Manejo de errores** | Respuestas estructuradas sin exponer detalles internos |
| **Validación de entrada** | Campos, formatos y tipos verificados en cada endpoint |

---

## 👥 Equipo

Proyecto desarrollado por aprendices del **SENA — Centro de Procesos Industriales y Construcción (CPIC)**:

| Nombre | Rol |
|---|---|
| **Jeferson Hernandez** | Fullstack Developer / Scrum Master |
| **Juan Manuel Zuluaga** | Frontend Developer |
| **Jose Miguel Sierra** | Frontend Developer |

> 📅 *Proyecto formativo — Versión 2.0 ApiRest · Octubre 2025*

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos y formativos en el marco del SENA. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**⭐ Si este proyecto te fue útil, no olvides darle una estrella al repositorio ⭐**

Hecho con ❤️ por aprendices del **SENA CPIC**

[![API Status](https://img.shields.io/badge/API-Online-brightgreen?style=flat-square)](https://api-projectretention-711.onrender.com/)
[![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![ORM](https://img.shields.io/badge/ORM-Sequelize-52B0E7?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

</div>