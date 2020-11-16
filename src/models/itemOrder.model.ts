import { Item } from './item.model';

export class ItemOrder {
    id: number;
    item: Item;
    quanity: number;
    totalPrice: string;
}