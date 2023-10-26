import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Customer } from './customer.schema';
import { Purchase } from '../../purchase/graphQL/purchase.schema';

@InputType('GetCustomerInput')
@ArgsType()
export class GetCustomerArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly email?: string;
}
