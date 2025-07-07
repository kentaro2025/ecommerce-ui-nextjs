"use client"

import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function ContactInfo() {
  const { t } = useLanguage()

  const contactMethods = [
    {
      icon: Mail,
      title: t("email"),
      value: "support@modernshop.com",
      description: t("emailDesc"),
      action: "mailto:support@modernshop.com",
    },
    {
      icon: Phone,
      title: t("phone"),
      value: "+1 (555) 123-4567",
      description: t("phoneDesc"),
      action: "tel:+15551234567",
    },
    {
      icon: MessageCircle,
      title: t("liveChat"),
      value: t("chatAvailable"),
      description: t("liveChatDesc"),
      action: "#",
    },
    {
      icon: Headphones,
      title: t("customerSupport"),
      value: t("24_7Support"),
      description: t("supportDesc"),
      action: "#",
    },
  ]

  const businessHours = [
    { day: t("monday"), hours: "9:00 AM - 6:00 PM" },
    { day: t("tuesday"), hours: "9:00 AM - 6:00 PM" },
    { day: t("wednesday"), hours: "9:00 AM - 6:00 PM" },
    { day: t("thursday"), hours: "9:00 AM - 6:00 PM" },
    { day: t("friday"), hours: "9:00 AM - 6:00 PM" },
    { day: t("saturday"), hours: "10:00 AM - 4:00 PM" },
    { day: t("sunday"), hours: t("closed") },
  ]

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods.map((method, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-sm font-medium text-primary mb-1">{method.value}</p>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={method.action}>{t("contact")}</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("businessHours")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {businessHours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-1">
                <span className="font-medium">{schedule.day}</span>
                <span className="text-muted-foreground">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("ourLocation")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">ModernShop Headquarters</p>
            <p className="text-muted-foreground">
              123 Commerce Street
              <br />
              Business District
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              {t("getDirections")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Link */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">{t("needQuickHelp")}</h3>
          <p className="text-muted-foreground mb-4">{t("checkFaqDesc")}</p>
          <Button variant="outline">{t("visitFaq")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
