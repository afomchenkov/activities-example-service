import { Args, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { Activity } from '../entities/activity.entity';
import { Supplier } from '../entities/supplier.entity';
import { ActivitiesList } from '../entities/activities-list.entity';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => ActivitiesList)
export class ActivitiesListResolver {
  constructor(private readonly dataService: DataService) {}

  @Query((returns) => ActivitiesList)
  async activitiesList(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('search') search: string,
  ): Promise<ActivitiesList> {
    let activities: Activity[] = [];

    for (const activity of await this.dataService.getAllActivities()) {
      const supplier: Supplier = await this.dataService.getSupplierById(
        activity.supplierId,
      );

      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${activity.id} not found`,
        );
      }

      if (search) {
        const shouldIncludeInResult = activity.title
          .toLowerCase()
          .includes(search.toLowerCase());

        if (shouldIncludeInResult) {
          activities.push({ ...activity, supplier });
        }
      } else {
        activities.push({ ...activity, supplier });
      }
    }

    const totalCount = activities.length;
    activities = activities.slice(offset, offset + limit);

    return {
      activities,
      totalCount,
      offset,
    };
  }
}
