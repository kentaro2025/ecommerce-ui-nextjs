"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Wallet, Building, Bitcoin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useLanguage } from "@/components/language-provider"

export default function CheckoutForm() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const { items, getTotal } = useCart()
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle checkout logic here
    alert("Order placed successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t("shippingInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input id="firstName" required />
              </div>
              <div>
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input id="lastName" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">{t("city")}</Label>
                <Input id="city" required />
              </div>
              <div>
                <Label htmlFor="zipCode">{t("zipCode")}</Label>
                <Input id="zipCode" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>{t("paymentMethod")}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <Label htmlFor="card" className="flex-1">
                  {t("creditDebitCard")}
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="paypal" id="paypal" />
                <Wallet className="h-5 w-5" />
                <Label htmlFor="paypal" className="flex-1">
                  PayPal
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="bank" id="bank" />
                <Building className="h-5 w-5" />
                <Label htmlFor="bank" className="flex-1">
                  {t("bankTransfer")}
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="crypto" id="crypto" />
                <Bitcoin className="h-5 w-5" />
                <Label htmlFor="crypto" className="flex-1">
                  {t("cryptocurrency")}
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">{t("expiry")}</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
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
            <Button type="submit" className="w-full" size="lg">
              {t("placeOrder")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
