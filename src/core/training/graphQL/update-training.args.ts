import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';
import { TrainingType } from '#src/core/training/training.type';

@ArgsType()
export class UpdateTrainingArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @Field(() => Float, { nullable: true })
  readonly price?: number;

  @Field(() => TrainingType, { nullable: true })
  readonly type?: TrainingType;
}
