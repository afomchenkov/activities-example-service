import { AbstractModel } from './abstract.model';

export class Activity extends AbstractModel {
  id: number;
  title: string;
  price: number;
  currency: string;
  rating: number;
  specialOffer: boolean;
  supplierId: number;

  // copy constructor
  constructor(data: Partial<Activity>) {
    super();
    this.id = this.throwIfUndefined(data.id);
    this.title = data.title;
    this.price = data.price;
    this.currency = data.currency;
    this.rating = data.rating;
    this.specialOffer = data.specialOffer;
    this.supplierId = data.supplierId;
  }
}
