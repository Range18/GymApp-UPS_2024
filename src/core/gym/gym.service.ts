import { Entity, Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { GymEntity } from '#src/core/gym/gym.entity';

@Entity()
export class GymService extends BaseEntityService<GymEntity> {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {
    super(gymRepository);
  }
}
