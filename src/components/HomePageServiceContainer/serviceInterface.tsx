export interface IService {
    id: number;
    name: string;
    category: string;
    address: string;
    vendorUsername: string;
    price: number;
    images: string[];
    discount?: number;
    desc: string;
    reviews: string[]
    _count?: {
        reservation: number,
        reviews: number
    }
}
