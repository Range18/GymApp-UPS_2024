import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { GetGymArgs } from '#src/core/gym/graphQL/get-gym.args';

@InputType('GetTrainingInput')
@ArgsType()
export class GetTrainingArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field(() => GetGymArgs, { nullable: true })
  readonly gym?: GetGymArgs;

  @Field(() => Int, { nullable: true })
  readonly price?: number;

  @Field({ nullable: true })
  readonly type?: string;
}
