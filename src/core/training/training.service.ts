import { Entity, Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { TrainingEntity } from '#src/core/training/training.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Exceptions } from '#src/common/exceptions/exception.types';
import { GraphQLException } from '#src/common/exceptions/GraphQLException';
import { HttpStatus } from '@nestjs/common';
import TrainingExceptions = Exceptions.TrainingExceptions;

@Entity()
export class TrainingService extends BaseEntityService<TrainingEntity> {
  constructor(
    @InjectRepository(TrainingEntity)
    private readonly trainingRepository: Repository<TrainingEntity>,
  ) {
    super(
      trainingRepository,
      new GraphQLException(
        HttpStatus.NOT_FOUND,
        'TrainingExceptions',
        TrainingExceptions.NotFound,
      ),
    );
  }
}
