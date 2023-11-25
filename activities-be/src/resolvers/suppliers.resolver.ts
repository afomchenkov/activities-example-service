import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { DataService } from '../services/data.service';
import { Supplier } from '../entities/supplier.entity';

/* eslint-disable @typescript-eslint/no-unused-vars */
@Resolver((of) => Supplier)
export class SuppliersResolver {
  constructor(private readonly dataService: DataService) {}

  @Query((returns) => [Supplier])
  async suppliers(): Promise<Supplier[]> {
    return this.dataService.getAllSuppliers();
  }

  @Query((returns) => Supplier)
  async supplier(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Supplier> {
    return this.dataService.getSupplierById(id);
  }
}
