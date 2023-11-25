import { AbstractGenericRepository } from '../repository/abstract-generic.repository';
import { Activity } from '../models/activity';
import { Supplier } from '../models/supplier';

export abstract class AbstractDataService {
  abstract activities: AbstractGenericRepository<Activity>;
  abstract suppliers: AbstractGenericRepository<Supplier>;
}
