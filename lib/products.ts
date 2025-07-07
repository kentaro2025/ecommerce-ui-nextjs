import type { Product } from "./types"

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: "/images/products/headphones.jpg",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ["wireless", "bluetooth", "headphones"],
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    image: "/images/products/tshirt.jpg",
    category: "Clothing",
    rating: 4.2,
    reviews: 89,
    inStock: true,
    tags: ["organic", "cotton", "sustainable"],
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    image: "/images/products/smartwatch.jpg",
    category: "Electronics",
    rating: 4.7,
    reviews: 256,
    inStock: true,
    tags: ["fitness", "smartwatch", "health"],
  },
  {
    id: "4",
    name: "Ceramic Coffee Mug Set",
    description: "Beautiful handcrafted ceramic mugs perfect for your morning coffee or tea.",
    price: 24.99,
    image: "/images/products/coffee-mug.jpg",
    category: "Home & Garden",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    tags: ["ceramic", "coffee", "handcrafted"],
  },
  {
    id: "5",
    name: "Yoga Mat Premium",
    description: "Non-slip premium yoga mat with excellent grip and cushioning for all yoga practices.",
    price: 49.99,
    image: "/images/products/yoga-mat.jpg",
    category: "Sports",
    rating: 4.6,
    reviews: 143,
    inStock: true,
    tags: ["yoga", "fitness", "non-slip"],
  },
  {
    id: "6",
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: "/images/products/wireless-charger.jpg",
    category: "Electronics",
    rating: 4.1,
    reviews: 92,
    inStock: true,
    tags: ["wireless", "charger", "fast-charging"],
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    description: "Stylish genuine leather crossbody bag perfect for everyday use.",
    price: 79.99,
    image: "/images/products/leather-bag.jpg",
    category: "Accessories",
    rating: 4.4,
    reviews: 78,
    inStock: true,
    tags: ["leather", "bag", "crossbody"],
  },
  {
    id: "8",
    name: "Indoor Plant Collection",
    description: "Set of 3 low-maintenance indoor plants perfect for home or office decoration.",
    price: 39.99,
    image: "/images/products/plants.jpg",
    category: "Home & Garden",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    tags: ["plants", "indoor", "decoration"],
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.find((product) => product.id === id) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.filter((product) => product.category === category)
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )
}
