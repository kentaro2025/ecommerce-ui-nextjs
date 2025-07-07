import Header from "@/components/header"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"

export default function Checkout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
