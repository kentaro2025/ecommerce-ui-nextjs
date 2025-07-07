"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">{t("cartEmpty")}</h1>
        <p className="text-muted-foreground mb-8">{t("cartEmptyDesc")}</p>
        <Link href="/products">
          <Button>{t("continueShopping")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">{t("shoppingCart")}</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.size || "default"}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-muted-foreground">{item.category}</p>
                    <p className="text-2xl font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center border rounded-lg">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>{t("subtotal")}</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("shipping")}</span>
              <span>{t("free")}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("tax")}</span>
              <span>${(getTotal() * 0.1).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>{t("total")}</span>
              <span>${(getTotal() * 1.1).toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full" size="lg">
                {t("proceedToCheckout")}
              </Button>
            </Link>
            <Link href="/products" className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                {t("continueShopping")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
