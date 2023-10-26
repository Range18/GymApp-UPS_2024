import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateCustomerArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly email?: string;
}
