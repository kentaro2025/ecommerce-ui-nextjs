"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Toys", "Beauty", "Automotive"]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category && category !== "all") {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleCategoryChange} defaultValue={searchParams.get("category") || "all"}>
      <SelectTrigger className="w-full md:w-48">
        <SelectValue placeholder={t("selectCategory")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t("allCategories")}</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
