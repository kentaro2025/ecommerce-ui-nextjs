"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">{t("messageSent")}</h3>
          <p className="text-muted-foreground">{t("messageSentDesc")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{t("sendMessage")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input id="phone" type="tel" />
          </div>

          <div>
            <Label htmlFor="subject">{t("subject")}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("selectSubject")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t("generalInquiry")}</SelectItem>
                <SelectItem value="support">{t("customerSupport")}</SelectItem>
                <SelectItem value="orders">{t("orderInquiry")}</SelectItem>
                <SelectItem value="returns">{t("returnsRefunds")}</SelectItem>
                <SelectItem value="partnership">{t("partnership")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea id="message" placeholder={t("writeMessage")} rows={5} required />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {t("sending")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {t("sendMessage")}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
