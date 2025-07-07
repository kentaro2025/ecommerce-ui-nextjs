import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetail from "@/components/product-detail"
import { getProductById } from "@/lib/products"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  )
}
