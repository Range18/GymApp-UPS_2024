import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field({ nullable: false })
  readonly name: string;

  @IsEmail()
  @Field({ nullable: false })
  readonly email: string;
}
