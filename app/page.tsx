import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import { getProducts } from "@/lib/products"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <ProductGrid products={products.slice(0, 8)} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
