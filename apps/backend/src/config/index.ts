export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/devoted_slingers',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
