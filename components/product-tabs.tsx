"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductGrid from "./product-grid"
import type { Product } from "@/lib/types"
import { useLanguage } from "@/components/language-provider"

interface ProductTabsProps {
  products: Product[]
  activeTab?: string
}

export default function ProductTabs({ products, activeTab }: ProductTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [currentTab, setCurrentTab] = useState(activeTab || "popular")

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab)
    }
  }, [activeTab])

  const handleTabChange = (value: string) => {
    setCurrentTab(value)
    const params = new URLSearchParams(searchParams)
    params.set("tab", value)
    router.push(`/products?${params.toString()}`)
  }

  // Filter products based on tab
  const getFilteredProducts = (tab: string) => {
    switch (tab) {
      case "popular":
        return [...products].sort((a, b) => b.reviews - a.reviews)
      case "deals":
        return products.filter((product) => product.discount && product.discount > 0)
      case "new":
        // Simulate new arrivals by taking products with higher IDs
        return [...products].sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
      case "featured":
        return products.filter((product) => product.rating >= 4.5)
      default:
        return products
    }
  }

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="popular" className="text-sm md:text-base">
          {t("popular")}
        </TabsTrigger>
        <TabsTrigger value="deals" className="text-sm md:text-base">
          {t("bestDeals")}
        </TabsTrigger>
        <TabsTrigger value="new" className="text-sm md:text-base">
          {t("newArrivals")}
        </TabsTrigger>
        <TabsTrigger value="featured" className="text-sm md:text-base">
          {t("featured")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="popular" className="mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{t("popularProducts")}</h2>
          <p className="text-muted-foreground">{t("popularProductsDesc")}</p>
        </div>
        <ProductGrid products={getFilteredProducts("popular")} />
      </TabsContent>

      <TabsContent value="deals" className="mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{t("bestDeals")}</h2>
          <p className="text-muted-foreground">{t("bestDealsDesc")}</p>
        </div>
        <ProductGrid products={getFilteredProducts("deals")} />
      </TabsContent>

      <TabsContent value="new" className="mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{t("newArrivals")}</h2>
          <p className="text-muted-foreground">{t("newArrivalsDesc")}</p>
        </div>
        <ProductGrid products={getFilteredProducts("new")} />
      </TabsContent>

      <TabsContent value="featured" className="mt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{t("featuredProducts")}</h2>
          <p className="text-muted-foreground">{t("featuredProductsDesc")}</p>
        </div>
        <ProductGrid products={getFilteredProducts("featured")} />
      </TabsContent>
    </Tabs>
  )
}
