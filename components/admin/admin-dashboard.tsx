"use client"

import { useState } from "react"
import { Package, Users, ShoppingCart, DollarSign, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductManagement from "./product-management"
import OrderManagement from "./order-management"
import UserManagement from "./user-management"
import Analytics from "./analytics"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      icon: Package,
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: "5,678",
      icon: ShoppingCart,
      change: "+8%",
    },
    {
      title: "Total Users",
      value: "9,012",
      icon: Users,
      change: "+15%",
    },
    {
      title: "Revenue",
      value: "$123,456",
      icon: DollarSign,
      change: "+23%",
    },
  ]

  const handleAddProduct = () => {
    setActiveTab("products")
    // Small delay to ensure tab is switched before opening dialog
    setTimeout(() => {
      setIsAddProductOpen(true)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleAddProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">Customer {i}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Product {i}</p>
                          <p className="text-sm text-muted-foreground">Category {i}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{Math.floor(Math.random() * 100 + 50)} sold</p>
                          <p className="text-sm text-muted-foreground">${(Math.random() * 100 + 20).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
