import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsTypeOf } from '#src/common/decorators/IsTrainingType.decorator';
import { IsPositive } from 'class-validator';

@InputType()
export class CreateTraining {
  @Field(() => Int, { nullable: false })
  readonly gymId: number;

  @IsPositive()
  @Field(() => Float, { nullable: false })
  readonly price: number;

  @IsTypeOf('TrainingType')
  @Field({ nullable: false })
  readonly type: string;
}
