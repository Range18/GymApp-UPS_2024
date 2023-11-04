import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType('GetCustomerInput')
@ArgsType()
export class GetCustomerArgs {
  @Field(() => Int, { nullable: true })
  readonly ID?: number;

  @Field({ nullable: true })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  readonly email?: string;
}
