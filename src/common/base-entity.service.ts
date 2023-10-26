import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import * as console from 'console';
import * as assert from 'assert';
import deepEqual from 'deep-equal';

export abstract class BaseEntityService<Entity extends object> {
  protected constructor(
    private readonly entityRepository: Repository<Entity>,
  ) {}

  async find(options: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.entityRepository.find(options);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
    if (options.where && deepEqual(options.where, {})) {
      throw new Error('Properties in the options.where must be defined');
    }
    return await this.entityRepository.findOne(options);
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

    return await this.entityRepository.remove(entity);
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

    this.entityRepository.merge(entity, toUpdate);

    return this.entityRepository.save(entity);
  }
}
