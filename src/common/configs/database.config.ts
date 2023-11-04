import env from 'env-var';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: env.get('DB_PORT').required().asPortNumber(),
  host: env.get('DB_HOST').default('localhost').asString(),
  database: env.get('DB_NAME').required().asString(),
  username: env.get('DB_USER').required().asString(),
  password: env.get('DB_PASSWORD').required().asString(),
  synchronize: false,
  dropSchema: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
};

export const dataSource = new DataSource(databaseConfig as DataSourceOptions);
