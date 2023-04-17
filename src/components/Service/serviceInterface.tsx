export interface IService {
  id: number;
  name: string;
  category: string;
  place: string;
  time: string;
  store: string;
  price: number;
  image: string[];
  discount?: number;
  description: string;
}
