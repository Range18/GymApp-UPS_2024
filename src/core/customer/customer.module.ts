import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { PurchaseModule } from '#src/core/purchase/purchase.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), PurchaseModule],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
