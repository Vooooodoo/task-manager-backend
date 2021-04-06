const dotenv = require('dotenv');

const { parsed: envConfig } = dotenv.config();

const config = {
  nodeEnv: envConfig.NODE_ENV,
  port: envConfig.PORT,
  isDev: envConfig.NODE_ENV === 'development',
  corsOrigin: envConfig.CORS_ORIGIN,
  db: {
    devUrl: envConfig.DEV_DB_URL,
  },
  jwt: {
    secret: envConfig.JWT_SECRET,
    expiresIn: envConfig.JWT_EXPIRES_IN,
  },
  passwordHash: {
    salt: envConfig.PASSWORD_HASH_SALT,
  },
};

module.exports = config;
