import {
  Args,
  Parent,
  Resolver,
  ResolveField,
  Query,
  Int,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { Activity } from '../entities/activity.entity';
import { Supplier } from '../entities/supplier.entity';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver(() => Activity)
export class ActivitiesResolver {
  constructor(private readonly dataService: DataService) {}

  @Query((returns) => [Activity])
  async activities(): Promise<Activity[]> {
    const result: Activity[] = [];

    for (const activity of await this.dataService.getAllActivities()) {
      const supplier: Supplier = await this.dataService.getSupplierById(
        activity.supplierId,
      );

      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${activity.id} not found`,
        );
      }

      result.push({ ...activity, supplier });
    }

    return result;
  }

  @Query((returns) => Activity)
  async activity(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Activity> {
    const activity = await this.dataService.getActivityById(id);
    const supplier = await this.dataService.getSupplierById(
      activity.supplierId,
    );
    return { ...activity, supplier };
  }

  @ResolveField((of) => Supplier)
  supplier(@Parent() activity: Activity): Supplier {
    return activity.supplier;
  }
}
