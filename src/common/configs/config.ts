import env from 'env-var';
import 'dotenv/config';

export const serverConfig = {
  port: env.get('PORT').default(3000).asPortNumber(),
  host: env.get('HOST').default('localhost').asString(),
};

export const frontendConfig = {
  url: env.get('FRONTEND_URL').default('*').asString(),
};
