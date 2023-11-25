import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Activity } from './activity.entity';

/**
 * - SDL ActivitiesList
 *
 * type ActivitiesList {
 *    totalCount: Int!
 *    offset: Int!
 *    activities: Activity!
 * }
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
@ObjectType()
export class ActivitiesList {
  @Field((type) => Int)
  totalCount: number;

  @Field((type) => Int)
  offset: number;

  @Field((type) => [Activity])
  activities: Activity[];
}
