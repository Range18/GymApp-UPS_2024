import { ArgsType, Field, Float, InputType, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';
import { TrainingType } from '#src/core/training/training.type';

@InputType('GetTrainingInput')
@ArgsType()
export class GetTrainingArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @Field(() => Float, { nullable: true })
  readonly price?: number;

  @Field(() => TrainingType, { nullable: true })
  readonly type?: TrainingType;
}
