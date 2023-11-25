import { AbstractModel } from './abstract.model';

export class Supplier extends AbstractModel {
  id: number;
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;

  // copy constructor
  constructor(data: Partial<Supplier>) {
    super();
    this.id = this.throwIfUndefined(data.id);
    this.name = data.name;
    this.address = data.address;
    this.zip = data.zip;
    this.city = data.city;
    this.country = data.country;
  }
}
