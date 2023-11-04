import { Entity, Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { GymEntity } from '#src/core/gym/gym.entity';
import { Exceptions } from '#src/common/exceptions/exception.types';
import GymExceptions = Exceptions.GymExceptions;
import { GraphQLException } from '#src/common/exceptions/GraphQLException';
import { HttpStatus } from '@nestjs/common';

@Entity()
export class GymService extends BaseEntityService<GymEntity> {
  constructor(
    @InjectRepository(GymEntity)
    private readonly gymRepository: Repository<GymEntity>,
  ) {
    super(
      gymRepository,
      new GraphQLException(
        HttpStatus.NOT_FOUND,
        'GymExceptions',
        GymExceptions.NotFound,
      ),
    );
  }
}
