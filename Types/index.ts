import {ReactElement} from "react";
import {IconType} from "react-icons";

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
    id: string;
    username: string;
    name: string;
    certified: boolean;
    status: string;
    phone: string;
    desc: string;
    category: string[];
    createdAt: string;
    user: User;
    products: Product[];
    _count?: {
        products: string;
    };
    rating: {
        _avg: string;
        _count: string;
    };
};

export enum ProductPricingType {
    flexible = "FLEXIBLE",
    fixed = "FIXED"
}


export type Product = {
    id: string;
    vendorId: string;
    vendor: Vendor;
    category: string;
    name: string;
    images: string[];
    address: string;
    price: number;
    quantity: number
    desc: string;
    type: ProductPricingType,
    ProductFixedTimeSlot?: ProductFixedTimeSlot[]
    avgRating: number;
    reviews: Review[];
    createdAt: string;
    _count?: {
        Reservation: number;
        ProductFixedTimeSlot: number;
        reviews: number;
    };
};

export type Reservation = {
    id?: string;
    userId?: string;
    quantity: number;
    total: number;
    discountId?: string
    productId: string
    productFixedTimeSlotId?: string
    startAt?: string
    endAt?: string
    customer?: User
    Product?: Product
    ProductFixedTimeSlot?: ProductFixedTimeSlot
    createAt?: string
}

export type ProductFixedTimeSlot = {
    id: string
    productId: string
    from: string
    to: string
    quantity: number
}

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

export type Discount = {
    id?: string;
    name: string;
    desc: string;
    amount: number;
    image: string;
    start: string;
    end: string;
};
