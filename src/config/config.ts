export default () => ({
  port: parseInt(process.env.DATABASE_PORT) || 3000,
  db: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    database: process.env.DATABASE_NAME || 'kupipodariday',
    username: process.env.DATABASE_USER || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
  },
});
