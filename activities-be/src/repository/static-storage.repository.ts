import { readFile } from 'fs/promises';
import { AbstractGenericRepository } from './abstract-generic.repository';

export type RawDataMapper<T> = (data: unknown) => T;

export class StaticStorageRepository<T>
  implements AbstractGenericRepository<T>
{
  constructor(
    private path: string,
    private toValidModel: RawDataMapper<T> = (data: T) => data,
  ) {}

  async getAll(): Promise<T[]> {
    const rawData = await readFile(this.path, { encoding: 'utf-8' });
    const items: T[] = JSON.parse(rawData);
    return items.map(this.toValidModel);
  }

  async get(id: number): Promise<T> {
    const rawData = await readFile(this.path, { encoding: 'utf-8' });
    const item: T = JSON.parse(rawData).find((item) => item.id === id);
    return this.toValidModel(item);
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */

  // not implemented
  async create(_item: T): Promise<null> {
    return Promise.resolve(null);
  }

  // not implemented
  async update(_id: string, _item: T): Promise<null> {
    return Promise.resolve(null);
  }

  // not implemented
  async delete(_id: string): Promise<null> {
    return Promise.resolve(null);
  }
}
