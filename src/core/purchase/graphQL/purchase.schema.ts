import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Training } from '../../training/graphQL/training.schema';
import { Customer } from '../../customer/graphQL/customer.schema';

@ObjectType()
export class Purchase {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field(() => Training)
  training: Training;

  @Field(() => Customer)
  customer: Customer;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Float, { nullable: false })
  gymIncome: number;
}
