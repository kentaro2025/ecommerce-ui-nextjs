import AdminDashboard from "@/components/admin/admin-dashboard"
import { redirect } from "next/navigation"

// In a real app, you'd check authentication here
async function checkAdminAuth() {
  // Placeholder for admin authentication
  return true
}

export default async function AdminPage() {
  const isAdmin = await checkAdminAuth()

  if (!isAdmin) {
    redirect("/login")
  }

  return <AdminDashboard />
}
