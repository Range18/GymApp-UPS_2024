import { get } from 'env-var';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export const databaseConfig: TypeOrmModuleOptions = {
  port: get('DB_PORT').required().asPortNumber(),
  host: get('DB_HOST').default('localhost').asString(),
  database: get('DB_NAME').required().asString(),
  username: get('DB_USER').required().asString(),
  password: get('DB_PASSWORD').required().asString(),
  synchronize: get('DB_SYNC').default('false').asBool(),
  dropSchema: get('DB_DROP').default('false').asBool(),
  autoLoadEntities: true,
  type: 'postgres',
};
