"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 12000, orders: 145, customers: 89 },
  { month: "Feb", sales: 15000, orders: 178, customers: 112 },
  { month: "Mar", sales: 18000, orders: 203, customers: 134 },
  { month: "Apr", sales: 22000, orders: 245, customers: 156 },
  { month: "May", sales: 25000, orders: 289, customers: 178 },
  { month: "Jun", sales: 28000, orders: 312, customers: 201 },
  { month: "Jul", sales: 32000, orders: 356, customers: 223 },
  { month: "Aug", sales: 29000, orders: 334, customers: 198 },
  { month: "Sep", sales: 35000, orders: 398, customers: 245 },
  { month: "Oct", sales: 38000, orders: 423, customers: 267 },
  { month: "Nov", sales: 42000, orders: 467, customers: 289 },
  { month: "Dec", sales: 45000, orders: 512, customers: 312 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "#8884d8" },
  { name: "Clothing", value: 32, color: "#82ca9d" },
  { name: "Home & Garden", value: 28, color: "#ffc658" },
  { name: "Sports", value: 15, color: "#ff7300" },
  { name: "Books", value: 8, color: "#00ff88" },
  { name: "Others", value: 12, color: "#ff0088" },
]

const revenueData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 3800 },
  { day: "Wed", revenue: 5100 },
  { day: "Thu", revenue: 4600 },
  { day: "Fri", revenue: 6200 },
  { day: "Sat", revenue: 7800 },
  { day: "Sun", revenue: 5900 },
]

export default function Analytics() {
  const metrics = [
    {
      title: "Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: "2,345",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Products Sold",
      value: "3,456",
      change: "-2.1%",
      trend: "down",
      icon: Package,
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "sales" ? `$${value.toLocaleString()}` : value,
                    name === "sales" ? "Sales" : name === "orders" ? "Orders" : "Customers",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ fill: "#82ca9d", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Categories Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Electronics", sales: 45, revenue: "$12,345", growth: "+23%" },
              { name: "Clothing", sales: 32, revenue: "$8,901", growth: "+18%" },
              { name: "Home & Garden", sales: 28, revenue: "$6,789", growth: "+15%" },
              { name: "Sports", sales: 15, revenue: "$3,456", growth: "+12%" },
              { name: "Books", sales: 8, revenue: "$2,123", growth: "+8%" },
            ].map((category) => (
              <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.sales}% of total sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{category.revenue}</p>
                  <p className="text-sm text-green-600">{category.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
