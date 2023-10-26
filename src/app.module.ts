import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as process from 'process';
import { join } from 'path';
import { TrainingModule } from './core/training/training.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/configs/database.config';
import { CustomerModule } from './core/customer/customer.module';
import { GymModule } from './core/gym/gym.module';
import { PurchaseModule } from './core/purchase/purchase.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    CustomerModule,
    TrainingModule,
    GymModule,
    PurchaseModule,
  ],
})
export class AppModule {}
