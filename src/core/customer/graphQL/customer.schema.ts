import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Purchase } from '../../purchase/graphQL/purchase.schema';

@ObjectType()
export class Customer {
  @Field(() => Int, { nullable: false })
  readonly ID: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;

  @Field(() => [Purchase], { nullable: true })
  purchases?: Purchase[];
}
