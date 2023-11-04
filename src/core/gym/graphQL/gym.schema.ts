import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Training } from '../../training/graphQL/training.schema';

@ObjectType()
export class Gym {
  @Field(() => Int, { nullable: false })
  ID: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  adminName: string;

  @Field({ nullable: false })
  adminPhoneNumber: string;

  @Field(() => Int, { nullable: false })
  availableSlots: number;

  @Field(() => [Training], { nullable: true })
  trainings?: [Training];
}
