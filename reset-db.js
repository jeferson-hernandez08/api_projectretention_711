const { Client } = require('pg');

async function resetDatabase() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres' // Conectarse a la BD predeterminada
  };

  const client = new Client(config);
  try {
    await client.connect();
    const dbName = process.env.DB_NAME || 'projectretention711';
    
    // Terminar conexiones activas
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = $1
        AND pid <> pg_backend_pid();
    `, [dbName]);

    console.log('Conexiones terminadas. Reseteando BD...');
  } catch (error) {
    console.error('Error terminando conexiones:', error);
  } finally {
    await client.end();
  }

  // Ejecutar comandos de sequelize
  const { execSync } = require('child_process');
  try {
    execSync('npx sequelize-cli db:drop --env test', { stdio: 'inherit' });
    execSync('npx sequelize-cli db:create --env test', { stdio: 'inherit' });
    execSync('npx sequelize-cli db:migrate --env test', { stdio: 'inherit' });
    console.log('Reset de BD completado exitosamente.');
  } catch (error) {
    console.error('Error ejecutando comandos:', error);
    process.exit(1);
  }
}

resetDatabase();