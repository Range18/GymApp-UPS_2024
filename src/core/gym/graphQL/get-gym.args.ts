import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType('GetGymArgs')
@ArgsType()
export class GetGymArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field({ nullable: true })
  readonly adminName?: string;

  @Field({ nullable: true })
  readonly adminPhoneNumber?: string;

  @Field(() => Int, { nullable: true })
  readonly freeSlots?: number;

  @Field({ nullable: true })
  readonly name?: string;
}
