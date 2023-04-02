export interface IService {
  id: number;
  name: string;
  place: string;
  time: string;
  store: string;
  price: number;
  image: string[];
  discount?: number;
  description: string;
}
