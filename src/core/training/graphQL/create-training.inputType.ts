import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { TrainingType } from '#src/core/training/training.type';

@InputType()
export class CreateTraining {
  @Field(() => Int, { nullable: false })
  readonly gymId: number;

  @Field(() => Float, { nullable: false })
  readonly price: number;

  @Field(() => TrainingType, { nullable: false })
  readonly type: TrainingType;
}
