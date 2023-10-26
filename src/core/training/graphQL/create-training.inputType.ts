import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Training } from '#src/core/training/graphQL/training.schema';
import { Gym } from '#src/core/gym/graphQL/gym.schema';

@InputType()
export class CreateTraining {
  @Field(() => Int, { nullable: false })
  readonly gymId: number;

  @Field(() => Float, { nullable: false })
  readonly price: number;

  @Field({ nullable: false })
  readonly type: string;
}
