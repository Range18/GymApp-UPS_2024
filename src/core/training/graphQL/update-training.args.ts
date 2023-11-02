import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';
import { IsTypeOf } from '#src/common/decorators/IsTrainingType.decorator';
import { IsPositive } from 'class-validator';

@ArgsType()
export class UpdateTrainingArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @IsPositive()
  @Field(() => Float, { nullable: true })
  readonly price?: number;

  @IsTypeOf('TrainingType')
  @Field({ nullable: true })
  readonly type?: string;
}
