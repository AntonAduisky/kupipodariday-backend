export default () => ({
  port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database: process.env.DATABASE_NAME || 'kupipodariday',
    username: process.env.DATABASE_USER || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
    synchronize: Boolean(process.env.SYNCHRONIZE) || true,
  },
  JWT_SECRET: process.env.JWT_SECRET,
});
