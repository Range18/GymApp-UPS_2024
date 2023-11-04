import { ArgsType, Field } from '@nestjs/graphql';
import { GetCustomerArgs } from '#src/core/customer/graphQL/get-customer.args';
import { GetTrainingArgs } from '#src/core/training/graphQL/get-training.args';

@ArgsType()
export class GetPurchaseArgs {
  @Field({ nullable: true })
  readonly ID?: number;

  @Field(() => GetCustomerArgs, { nullable: true })
  readonly customer?: GetCustomerArgs;

  @Field({ nullable: true })
  readonly gymIncome?: number;

  @Field({ nullable: true })
  readonly price?: number;

  @Field(() => GetTrainingArgs, { nullable: true })
  readonly training?: GetTrainingArgs;
}
