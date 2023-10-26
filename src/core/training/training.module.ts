import { Module } from '@nestjs/common';
import { TrainingResolver } from './training.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingEntity } from './training.entity';
import { TrainingService } from '#src/core/training/training.service';
import { GymModule } from '#src/core/gym/gym.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingEntity]), GymModule],
  providers: [TrainingResolver, TrainingService],
  exports: [TrainingService],
})
export class TrainingModule {}
