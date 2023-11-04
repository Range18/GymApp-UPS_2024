import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { CreateCustomerInput } from '#src/core/customer/graphQL/create-customer.input-type';
import { GraphQLException } from '#src/common/exceptions/GraphQLException';
import { Exceptions } from '#src/common/exceptions/exception.types';
import CustomerExceptions = Exceptions.CustomerExceptions;

@Injectable()
export class CustomerService extends BaseEntityService<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {
    super(
      customerRepository,
      new GraphQLException(
        HttpStatus.NOT_FOUND,
        'CustomerExceptions',
        CustomerExceptions.NotFound,
      ),
    );
  }

  async createCustomer(
    customerInput: CreateCustomerInput,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne(
      {
        where: { email: customerInput.email },
      },
      false,
    );

    if (customer) {
      throw new GraphQLException(
        HttpStatus.CONFLICT,
        'CustomerExceptions',
        CustomerExceptions.AlreadyExists,
      );
    }

    return this.save({ email: customerInput.email, name: customerInput.name });
  }
}
