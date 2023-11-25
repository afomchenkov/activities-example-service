import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Supplier } from './supplier.entity';

/**
 * - SDL Activity
 *
 * type Activity {
 *    id: Int!
 *    title: String!
 *    price: Int!
 *    currency: String!
 *    rating: Int!
 *    specialOffer: Boolean!
 *    supplier: Supplier!
 * }
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
@ObjectType()
export class Activity {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  currency: string;

  @Field()
  rating: number;

  @Field()
  specialOffer: boolean;

  @Field((type) => Supplier)
  supplier: Supplier; // Reference to Supplier object
}
