import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';

@ArgsType()
export class UpdateTrainingArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @Field(() => Float, { nullable: true })
  readonly price?: number;

  @Field({ nullable: true })
  readonly type?: string;
}
