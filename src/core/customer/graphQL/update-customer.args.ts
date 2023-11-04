import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateCustomerArgs {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: true })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  readonly email?: string;
}
