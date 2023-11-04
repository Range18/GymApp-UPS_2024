import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Purchase } from '#src/core/purchase/graphQL/purchase.schema';
import { PurchaseService } from '#src/core/purchase/purchase.service';
import { GetPurchaseArgs } from '#src/core/purchase/graphQL/get-purchase.args';
import { CreatePurchaseInputType } from '#src/core/purchase/graphQL/create-purchase.inputType';
import { Customer } from '#src/core/customer/graphQL/customer.schema';
import { Training } from '#src/core/training/graphQL/training.schema';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(private readonly purchaseService: PurchaseService) {}
  @Mutation(() => Purchase, { name: 'purchaseTraining' })
  async purchaseTraining(
    @Args('PurchaseInput') purchaseInput: CreatePurchaseInputType,
  ) {
    return await this.purchaseService.purchaseTraining(purchaseInput);
  }

  @Query(() => Purchase, { name: 'Purchase', nullable: true })
  async getPurchase(@Args() purchase: GetPurchaseArgs) {
    return await this.purchaseService.findOne({ where: purchase });
  }

  @Query(() => [Purchase], {
    name: 'Purchases',
    nullable: 'itemsAndList',
  })
  async getPurchases(
    @Args('customerId', { type: () => Int }) customerId: number,
  ) {
    return await this.purchaseService.find({
      where: { customer: { ID: customerId } },
      relations: { customer: true },
    });
  }

  @Query(() => [Purchase], { nullable: 'itemsAndList' })
  async getAllPurchases(@Args() purchases: GetPurchaseArgs) {
    return await this.purchaseService.find({ where: purchases });
  }

  @ResolveField('customer', () => Customer)
  async getCustomer(@Parent() purchase: Purchase) {
    return (
      await this.purchaseService.findOne({
        where: purchase,
        relations: { customer: true },
      })
    ).customer;
  }

  @ResolveField('training', () => Training)
  async getTraining(@Parent() purchase: Purchase) {
    return (
      await this.purchaseService.findOne({
        where: purchase,
        relations: { training: true },
      })
    ).training;
  }
}
