import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Customer } from './graphQL/customer.schema';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './graphQL/create-customer.input-type';
import { GetCustomerArgs } from './graphQL/get-customer.args';
import { UpdateCustomerArgs } from './graphQL/update-customer.args';
import { Purchase } from '#src/core/purchase/graphQL/purchase.schema';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  async createCustomer(@Args('Customer') customer: CreateCustomerInput) {
    return await this.customerService.createCustomer(customer);
  }

  @Mutation(() => Customer)
  async updateCustomer(@Args() customer: UpdateCustomerArgs) {
    return await this.customerService.updateOne(
      { where: { ID: customer.ID } },
      {
        email: customer.email,
        name: customer.name,
      },
    );
  }

  @Mutation(() => Boolean)
  async removeCustomer(@Args() customer: GetCustomerArgs) {
    await this.customerService.removeOne({ where: customer });
    return true;
  }

  @Query(() => Customer, { name: 'Customer', nullable: true })
  async getCustomer(@Args() customer: GetCustomerArgs) {
    return await this.customerService.findOne({ where: customer });
  }

  @Query(() => [Customer], {
    name: 'Customers',
    nullable: 'itemsAndList',
  })
  async getCustomers(@Args() customers: GetCustomerArgs) {
    return await this.customerService.find({ where: customers });
  }

  @ResolveField('purchases', () => [Purchase], { nullable: true })
  async resolvePurchases(@Parent() customer: Customer) {
    return (
      await this.customerService.findOne({
        where: customer,
        relations: { purchases: true },
      })
    ).purchases;
  }
}
