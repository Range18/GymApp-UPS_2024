import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';
import { IsTypeOf } from '#src/common/decorators/IsTrainingType.decorator';
import { IsPositive } from 'class-validator';

@InputType('GetTrainingInput')
@ArgsType()
export class GetTrainingArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @IsPositive()
  @Field(() => Int, { nullable: true })
  readonly price?: number;

  @IsTypeOf('TrainingType')
  @Field({ nullable: true })
  readonly type?: string;
}
