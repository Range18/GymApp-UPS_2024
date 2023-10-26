import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/base-entity.service';

@Injectable()
export class CustomerService extends BaseEntityService<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {
    super(customerRepository);
  }
}
