import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './purchase.entity';
import { Module } from '@nestjs/common';
import { PurchaseService } from '#src/core/purchase/purchase.service';
import { PurchaseResolver } from '#src/core/purchase/purchase.resolver';
import { TrainingModule } from '#src/core/training/training.module';
import { GymModule } from '#src/core/gym/gym.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseEntity]),
    TrainingModule,
    GymModule,
  ],
  providers: [PurchaseService, PurchaseResolver],
  exports: [PurchaseService],
})
export class PurchaseModule {}
