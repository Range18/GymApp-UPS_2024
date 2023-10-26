import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Gym } from '#src/core/gym/graphQL/gym.schema';

@ArgsType()
export class UpdateGymArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: true })
  readonly adminName?: string;

  @Field({ nullable: true })
  readonly adminPhoneNumber?: string;

  @Field(() => Int, { nullable: true })
  readonly freeSlots?: number;

  @Field({ nullable: true })
  readonly name?: string;
}
