import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GymEntity } from './gym.entity';
import { GymResolver } from '#src/core/gym/gym.resolver';
import { GymService } from '#src/core/gym/gym.service';

@Module({
  imports: [TypeOrmModule.forFeature([GymEntity])],
  providers: [GymResolver, GymService],
  exports: [GymService],
})
export class GymModule {}
