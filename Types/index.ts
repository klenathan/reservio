export type User = {
    id: string
    username: string
    firstName: string
    email: string
    phoneNo: string
    avatar: string
    vendor: {
        id: string
    } | null
    admin: {
        id: string
    } | null
    createdAt: string
}

export type Vendor = {
    id: string
    username: string
    certified: boolean
    status: string
    desc: string
    category: string[]
    createdAt: string
    user: User
    products: Product[]
}

export type Product = {
    id: string
    vendorId: string
    vendor: Vendor
    category: string
    name: string
    images: string[]
    address: string
    price: number
    desc: string
    avgReview: number
    avgRating: number
    reviews: Review[]
    createdAt: string
}

export type Review = {
    id: string
    userId: string
    user: User
    productId: string
    product: Product
    rating: number
    feedback: string
    createAt: string
}