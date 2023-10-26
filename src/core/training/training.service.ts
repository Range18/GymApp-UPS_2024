import { Entity, Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { TrainingEntity } from '#src/core/training/training.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Entity()
export class TrainingService extends BaseEntityService<TrainingEntity> {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
  ) {
    super(trainingRepository);
  }
}
