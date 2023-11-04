import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Gym } from '../../gym/graphQL/gym.schema';
import { TrainingType } from '#src/core/training/training.type';

@ObjectType()
export class Training {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field(() => TrainingType, { nullable: false })
  type: TrainingType;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Gym, { nullable: false })
  gym: Gym;
}
