import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import deepEqual from 'deep-equal';
import { GraphQLException } from '#src/common/exceptions/GraphQLException';

export abstract class BaseEntityService<Entity extends object> {
  protected constructor(
    private readonly entityRepository: Repository<Entity>,
    private readonly NotFoundException: GraphQLException<any>,
  ) {}

  async find(
    options: FindManyOptions<Entity>,
    throwError = true,
  ): Promise<Entity[]> {
    const entities = await this.entityRepository.find(options);

    if (entities.length === 0 && throwError) {
      throw this.NotFoundException;
    }

    return entities;
  }

  async findOne(
    options: FindOneOptions<Entity>,
    throwError = true,
  ): Promise<Entity> {
    if (options.where && deepEqual(options.where, {})) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entity = await this.entityRepository.findOne(options);

    if (!entity && throwError) {
      throw this.NotFoundException;
    }

    return entity;
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity>;
  async save(entities: DeepPartial<Entity[]>): Promise<Entity[]>;
  async save(
    entities: DeepPartial<Entity> | DeepPartial<Entity[]>,
  ): Promise<Entity | Entity[]> {
    return Array.isArray(entities)
      ? this.entityRepository.save(entities)
      : this.entityRepository.save(entities);
  }

  async remove(
    optionsOrEntities: FindManyOptions<Entity> | Entity[],
  ): Promise<void> {
    if (
      optionsOrEntities['where'] &&
      deepEqual(optionsOrEntities['where'], {})
    ) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entities: Entity[] =
      'where' in <object>optionsOrEntities
        ? await this.entityRepository.find(
            optionsOrEntities as FindManyOptions<Entity>,
          )
        : (optionsOrEntities as Entity[]);

    if (!entities) {
      throw this.NotFoundException;
    }

    await this.entityRepository.remove(entities);
  }

  async removeOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
  ): Promise<Entity> {
    if (optionsOrEntity['where'] && deepEqual(optionsOrEntity['where'], {})) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entity: Entity =
      'where' in <object>optionsOrEntity
        ? await this.entityRepository.findOne(optionsOrEntity)
        : (optionsOrEntity as Entity);

    if (!entity) {
      throw this.NotFoundException;
    }

    const entityToReturn = { ...entity };

    await this.entityRepository.remove(entity);

    return entityToReturn;
  }

  async updateOne(
    optionsOrEntity: FindOneOptions<Entity> | Entity,
    toUpdate: DeepPartial<Entity>,
  ): Promise<Entity> {
    if (optionsOrEntity['where'] && deepEqual(optionsOrEntity['where'], {})) {
      throw new Error('Properties in the options.where must be defined');
    }

    const entity: Entity =
      'where' in <object>optionsOrEntity
        ? await this.entityRepository.findOne(optionsOrEntity)
        : (optionsOrEntity as Entity);

    if (!entity) {
      throw this.NotFoundException;
    }

    this.entityRepository.merge(entity, toUpdate);

    return this.entityRepository.save(entity);
  }
}
