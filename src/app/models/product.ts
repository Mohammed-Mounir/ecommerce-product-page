export interface IProduct {
  id: number;
  name: string;
  company: string;
  price: number;
  discount?: number;
  description: string;
  images: string[];
  quantity?: number;
}
