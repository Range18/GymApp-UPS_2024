import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateGymArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: true })
  readonly adminName?: string;

  @Field({ nullable: true })
  readonly adminPhoneNumber?: string;

  @Field(() => Int, { nullable: true })
  readonly availableSlots?: number;

  @Field({ nullable: true })
  readonly name?: string;
}
