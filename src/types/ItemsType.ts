export interface ItemType {
  id: string;
  name: string;
  event: number;
  materialType: number;
  price: number;
  counter: number;
}

export type ItemsType = ItemType[];
