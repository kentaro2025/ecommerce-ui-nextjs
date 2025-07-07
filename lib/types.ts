export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  tags?: string[]
}

export interface CartItem extends Product {
  quantity: number
  size?: string
  color?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: Address
  paymentMethod: string
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  zipCode: string
  country: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}
