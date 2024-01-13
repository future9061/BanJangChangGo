export interface ItemType {
  id: string | null;
  name: string | null;
  event: number | null;
  materialType: number | null;
  price: number | null;
  counter?: 0;
}

export type ItemsType = ItemType[];
