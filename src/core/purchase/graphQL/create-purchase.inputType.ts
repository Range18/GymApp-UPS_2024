import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePurchaseInputType {
  @Field(() => Int, { nullable: false })
  readonly trainingID: number;

  @Field(() => Int, { nullable: false })
  readonly customerID: number;
}
