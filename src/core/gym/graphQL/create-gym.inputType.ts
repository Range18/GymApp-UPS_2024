import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGymInput {
  @Field({ nullable: false })
  readonly name: string;

  @Field({ nullable: false })
  readonly adminName: string;

  @Field({ nullable: false })
  readonly adminPhoneNumber: string;

  @Field(() => Int, { nullable: false })
  readonly availableSlots: number;
}
