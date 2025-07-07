import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductTabs from "@/components/product-tabs"
import SearchBar from "@/components/search-bar"
import CategoryFilter from "@/components/category-filter"
import { getProducts } from "@/lib/products"

interface SearchParams {
  search?: string
  category?: string
  tab?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const products = await getProducts()

  let filteredProducts = products

  if (searchParams.search) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchParams.search!.toLowerCase()) ||
        product.description.toLowerCase().includes(searchParams.search!.toLowerCase()) ||
        product.category.toLowerCase().includes(searchParams.search!.toLowerCase()),
    )
  }

  if (searchParams.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === searchParams.category)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar />
            <CategoryFilter />
          </div>
        </div>
        <ProductTabs products={filteredProducts} activeTab={searchParams.tab} />
      </main>
      <Footer />
    </div>
  )
}
