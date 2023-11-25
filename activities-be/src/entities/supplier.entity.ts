import { ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * - SDL Supplier
 *
 * type Supplier {
 *    id: Int!
 *    name: String!
 *    address: String!
 *    zip: String!
 *    city: String!
 *    country: String!
 * }
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
@ObjectType()
export class Supplier {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  zip: string;

  @Field()
  city: string;

  @Field()
  country: string;
}
