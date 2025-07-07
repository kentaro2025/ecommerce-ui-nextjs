"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, Share2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"
import ReviewSection from "./review-section"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const { t } = useLanguage()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  const images = [product.image, ...Array(3).fill(product.image)]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviews} {t("reviews")})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
          {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">{t("description")}</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="flex-1">
            {t("addToCart")} - ${(product.price * quantity).toFixed(2)}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("category")}:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("inStock")}:</span>
                <span className="font-medium text-green-600">{t("available")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shipping")}:</span>
                <span className="font-medium">{t("freeShipping")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Details Tabs */}
      <div className="lg:col-span-2 mt-12">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t("description")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
            <TabsTrigger value="shipping">{t("shipping")}</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ReviewSection productId={product.id} />
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t("freeShipping")}</h4>
                    <p className="text-muted-foreground">{t("freeShippingDesc")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t("returns")}</h4>
                    <p className="text-muted-foreground">{t("returnsDesc")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
