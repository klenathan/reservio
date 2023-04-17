export interface IService {
  id: number;
  name: string;
  category: string;
  address: string;
  time: string;
  vendorUsername: string;
  price: number;
  images: string[];
  discount?: number;
  description: string;
}
