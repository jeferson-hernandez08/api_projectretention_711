const { Client } = require('pg');
const { execSync } = require('child_process');

async function resetDatabase() {
  // Obtener la cadena de conexión completa de Render
  const databaseUrl = process.env.DATABASE_URL || process.env.DB_URL;
  
  if (!databaseUrl) {
    console.error('Error: No se encontró DATABASE_URL o DB_URL en las variables de entorno');
    process.exit(1);
  }

  // Parsear la URL de la base de datos
  const url = new URL(databaseUrl);
  const dbName = url.pathname.substring(1); // Eliminar el slash inicial
  
  const config = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    port: url.port,
    database: 'postgres' // Conectarse a la BD predeterminada para administración
  };

  console.log('Intentando conectar a:', config.host);

  const client = new Client(config);
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');
    
    // Terminar conexiones activas
    console.log('Terminando conexiones activas...');
    const result = await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = $1
        AND pid <> pg_backend_pid();
    `, [dbName]);

    console.log(`Conexiones terminadas: ${result.rowCount}`);
    
  } catch (error) {
    console.error('Error terminando conexiones:', error.message);
    // Continuar aunque falle, puede que no haya conexiones activas
  } finally {
    await client.end();
  }

  // Ejecutar comandos de sequelize usando la ruta directa
  try {
    console.log('Eliminando base de datos...');
    execSync('node ./node_modules/sequelize-cli/lib/sequelize db:drop --env test', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: databaseUrl }
    });
    
    console.log('Creando base de datos...');
    execSync('node ./node_modules/sequelize-cli/lib/sequelize db:create --env test', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: databaseUrl }
    });
    
    console.log('Ejecutando migraciones...');
    execSync('node ./node_modules/sequelize-cli/lib/sequelize db:migrate --env test', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: databaseUrl }
    });
    
    console.log('Reset de BD completado exitosamente.');
  } catch (error) {
    console.error('Error ejecutando comandos:', error.message);
    process.exit(1);
  }
}

// Manejar promesas no capturadas
process.on('unhandledRejection', err => {
  console.error('Error no manejado:', err);
  process.exit(1);
});

resetDatabase();