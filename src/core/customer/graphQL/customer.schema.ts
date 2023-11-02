import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Purchase } from '../../purchase/graphQL/purchase.schema';
import { IsEmail } from 'class-validator';

@ObjectType()
export class Customer {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: false })
  name: string;

  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @Field(() => [Purchase], { nullable: true })
  purchases?: Purchase[];
}
