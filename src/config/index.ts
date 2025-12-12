
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || '5000',
  database_url: process.env.DATABASE_URL,

  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || process.env.SALT_ROUND || '10',

  jwt: {
    access_token_secret: process.env.JWT_SECRET || 'dev-secret',
    access_token_expires_in: process.env.EXPIRES_IN || '7d',
  },
};
