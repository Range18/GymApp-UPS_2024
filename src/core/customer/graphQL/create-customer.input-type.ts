import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field({ nullable: false })
  readonly name: string;

  @Field({ nullable: false })
  readonly email: string;
}
