export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'DATABASE_HOST option is not configured',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'DATABASE_USERNAME option is not configured',
    password: process.env.DATABASE_PASSWORD || 'DATABASE_PASSWORD option is not configured',
    database: process.env.DATABASE_NAME || 'DB_DATABASE option is not configured'
  },
  openweather: {
    url: process.env.OPENWEATHER_URL,
    apiKey: process.env.OPENWEATHER_API_KEY
  }
});
