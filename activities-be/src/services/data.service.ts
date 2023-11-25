import { join } from 'path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  Injectable,
  Inject,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { AbstractGenericRepository } from '../repository/abstract-generic.repository';
import { AbstractDataService } from './abstract-data.service';
import { StaticStorageRepository } from '../repository/static-storage.repository';
import { Activity } from '../models/activity';
import { Supplier } from '../models/supplier';

const ACTIVITY_CACHE_KEY = 'activity';
const SUPPLIER_CACHE_KEY = 'supplier';

@Injectable()
export class DataService
  implements AbstractDataService, OnApplicationBootstrap
{
  private readonly logger = new Logger(DataService.name);

  // abstract repository can be any source of data and can be injected via DI
  activities: AbstractGenericRepository<Activity>;
  suppliers: AbstractGenericRepository<Supplier>;

  // add in-memory cache
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  onApplicationBootstrap() {
    this.activities = new StaticStorageRepository<Activity>(
      join(__dirname, '..', 'static', 'activities.json'),
      /** activity mapper */
      (data: unknown) => new Activity(data),
    );
    this.suppliers = new StaticStorageRepository<Supplier>(
      join(__dirname, '..', 'static', 'suppliers.json'),
      /** supplier mapper */
      (data: unknown) => new Supplier(data),
    );
  }

  async getAllActivities(): Promise<Activity[]> {
    // can cache all items
    return this.activities.getAll();
  }

  async getActivityById(id: number): Promise<Activity> {
    const activityCacheKey = `${ACTIVITY_CACHE_KEY}:${id}`;
    const cachedActivity =
      await this.cacheManager.get<Activity>(activityCacheKey);

    if (!cachedActivity) {
      const activity = await this.activities.get(id);
      // serialize the data properly before saving to cache
      await this.cacheManager.set(activityCacheKey, activity);
      this.logger.debug(`Activity cache miss: ${id}`);
      return activity;
    }

    return cachedActivity;
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    // can cache all items
    return this.suppliers.getAll();
  }

  async getSupplierById(id: number): Promise<Supplier> {
    const supplierCacheKey = `${SUPPLIER_CACHE_KEY}:${id}`;
    const cachedSupplier =
      await this.cacheManager.get<Supplier>(supplierCacheKey);

    if (!cachedSupplier) {
      const supplier = await this.suppliers.get(id);
      // serialize the data properly before saving to cache
      await this.cacheManager.set(supplierCacheKey, supplier);
      this.logger.debug(`Supplier cache miss: ${id}`);
      return supplier;
    }

    return cachedSupplier;
  }
}
