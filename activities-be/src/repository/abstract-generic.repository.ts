export abstract class AbstractGenericRepository<T> {
  abstract getAll(): Promise<T[]>;
  abstract get(id: number | string): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: number | string, item: T): Promise<T>;
  abstract delete(id: number | string): Promise<T>;
}
