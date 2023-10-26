import { get } from 'env-var';
import 'dotenv/config';

export const serverConfig = {
  port: get('PORT').default(3000).asPortNumber(),
  host: get('HOST').default('localhost').asString(),
  isSecure: get('SECURE').default('false').asBool(),
};
