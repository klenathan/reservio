import { ReactElement } from "react";
import { IconType } from "react-icons";

export type User = {
  id: string;
  username: string;
  firstName: string;
  email: string;
  phoneNo: string;
  avatar: string;
  vendor: {
    id: string;
  } | null;
  admin: {
    id: string;
  } | null;
  createdAt: string;
};

export type Vendor = {
  images: any;
  id: string;
  username: string;
  name: string;
  certified: boolean;
  status: string;
  desc: string;
  category: string[];
  createdAt: string;
  user: User;
  products: Product[];
  _count?: {
    products: number;
  };
};

export type Product = {
  id: string;
  vendorId: string;
  vendor: Vendor;
  category: string;
  name: string;
  images: string[];
  address: string;
  price: number;
  desc: string;
  avgRating: number;
  reviews: Review[];
  createdAt: string;
  _count?: {
    reservation: number;
    reviews: number;
  };
};

export type Review = {
  id: string;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  rating: number;
  feedback: string;
  createAt: string;
};

export type Category = {
  id: string;
  category?: string;
  icon?: ReactElement<IconType>;
};

export type City = {
  id?: number;
  city?: string;
};
