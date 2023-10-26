import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Gym } from '../../gym/graphQL/gym.schema';

@ObjectType()
export class Training {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: false })
  type: string;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field(() => Gym, { nullable: false })
  gym: Gym;
}
