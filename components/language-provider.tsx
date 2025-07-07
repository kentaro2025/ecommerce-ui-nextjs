"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "ja"

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

const translations: Translations = {
  // Navigation
  home: { en: "Home", es: "Inicio", ja: "ホーム" },
  products: { en: "Products", es: "Productos", ja: "商品" },
  about: { en: "About", es: "Acerca de", ja: "会社概要" },
  contact: { en: "Contact", es: "Contacto", ja: "お問い合わせ" },

  // Hero Section
  heroTitle: {
    en: "Welcome to ModernShop",
    es: "Bienvenido a ModernShop",
    ja: "ModernShopへようこそ",
  },
  heroSubtitle: {
    en: "Discover amazing products with the best shopping experience",
    es: "Descubre productos increíbles con la mejor experiencia de compra",
    ja: "最高のショッピング体験で素晴らしい商品を発見してください",
  },
  shopNow: { en: "Shop Now", es: "Comprar Ahora", ja: "今すぐ購入" },
  learnMore: { en: "Learn More", es: "Saber Más", ja: "詳細を見る" },

  // Product Actions
  addToCart: { en: "Add to Cart", es: "Añadir al Carrito", ja: "カートに追加" },
  search: { en: "Search", es: "Buscar", ja: "検索" },
  searchProducts: { en: "Search products...", es: "Buscar productos...", ja: "商品を検索..." },
  selectCategory: { en: "Select Category", es: "Seleccionar Categoría", ja: "カテゴリを選択" },
  allCategories: { en: "All Categories", es: "Todas las Categorías", ja: "すべてのカテゴリ" },

  // Product Details
  description: { en: "Description", es: "Descripción", ja: "説明" },
  reviews: { en: "Reviews", es: "Reseñas", ja: "レビュー" },
  shipping: { en: "Shipping", es: "Envío", ja: "配送" },
  category: { en: "Category", es: "Categoría", ja: "カテゴリ" },
  inStock: { en: "In Stock", es: "En Stock", ja: "在庫あり" },
  available: { en: "Available", es: "Disponible", ja: "利用可能" },
  freeShipping: { en: "Free Shipping", es: "Envío Gratis", ja: "送料無料" },
  freeShippingDesc: {
    en: "Free shipping on orders over $50",
    es: "Envío gratis en pedidos superiores a $50",
    ja: "50ドル以上のご注文で送料無料",
  },
  returns: { en: "Returns", es: "Devoluciones", ja: "返品" },
  returnsDesc: {
    en: "30-day return policy",
    es: "Política de devolución de 30 días",
    ja: "30日間返品ポリシー",
  },

  // Reviews
  writeReview: { en: "Write a Review", es: "Escribir una Reseña", ja: "レビューを書く" },
  rating: { en: "Rating", es: "Calificación", ja: "評価" },
  yourReview: { en: "Your Review", es: "Tu Reseña", ja: "あなたのレビュー" },
  writeYourReview: { en: "Write your review...", es: "Escribe tu reseña...", ja: "レビューを書いてください..." },
  submitReview: { en: "Submit Review", es: "Enviar Reseña", ja: "レビューを送信" },
  customerReviews: { en: "Customer Reviews", es: "Reseñas de Clientes", ja: "お客様のレビュー" },
  helpful: { en: "Helpful", es: "Útil", ja: "役に立つ" },

  // Cart
  shoppingCart: { en: "Shopping Cart", es: "Carrito de Compras", ja: "ショッピングカート" },
  cartEmpty: { en: "Your cart is empty", es: "Tu carrito está vacío", ja: "カートは空です" },
  cartEmptyDesc: {
    en: "Add some products to get started",
    es: "Añade algunos productos para comenzar",
    ja: "商品を追加して始めましょう",
  },
  continueShopping: { en: "Continue Shopping", es: "Continuar Comprando", ja: "ショッピングを続ける" },
  orderSummary: { en: "Order Summary", es: "Resumen del Pedido", ja: "注文概要" },
  subtotal: { en: "Subtotal", es: "Subtotal", ja: "小計" },
  tax: { en: "Tax", es: "Impuesto", ja: "税金" },
  total: { en: "Total", es: "Total", ja: "合計" },
  free: { en: "Free", es: "Gratis", ja: "無料" },
  proceedToCheckout: { en: "Proceed to Checkout", es: "Proceder al Pago", ja: "チェックアウトに進む" },

  // Checkout
  shippingInfo: { en: "Shipping Information", es: "Información de Envío", ja: "配送情報" },
  firstName: { en: "First Name", es: "Nombre", ja: "名前" },
  lastName: { en: "Last Name", es: "Apellido", ja: "姓" },
  email: { en: "Email", es: "Correo Electrónico", ja: "メール" },
  address: { en: "Address", es: "Dirección", ja: "住所" },
  city: { en: "City", es: "Ciudad", ja: "市" },
  zipCode: { en: "Zip Code", es: "Código Postal", ja: "郵便番号" },
  paymentMethod: { en: "Payment Method", es: "Método de Pago", ja: "支払い方法" },
  creditDebitCard: { en: "Credit/Debit Card", es: "Tarjeta de Crédito/Débito", ja: "クレジット/デビットカード" },
  bankTransfer: { en: "Bank Transfer", es: "Transferencia Bancaria", ja: "銀行振込" },
  cryptocurrency: { en: "Cryptocurrency", es: "Criptomoneda", ja: "暗号通貨" },
  cardNumber: { en: "Card Number", es: "Número de Tarjeta", ja: "カード番号" },
  expiry: { en: "Expiry", es: "Vencimiento", ja: "有効期限" },
  placeOrder: { en: "Place Order", es: "Realizar Pedido", ja: "注文する" },

  // Footer
  footerDescription: {
    en: "Your trusted online shopping destination for quality products and exceptional service.",
    es: "Tu destino de compras en línea de confianza para productos de calidad y servicio excepcional.",
    ja: "品質の高い商品と優れたサービスを提供する信頼できるオンラインショッピングの目的地。",
  },
  quickLinks: { en: "Quick Links", es: "Enlaces Rápidos", ja: "クイックリンク" },
  customerSupport: { en: "Customer Support", es: "Atención al Cliente", ja: "カスタマーサポート" },
  helpCenter: { en: "Help Center", es: "Centro de Ayuda", ja: "ヘルプセンター" },
  privacy: { en: "Privacy Policy", es: "Política de Privacidad", ja: "プライバシーポリシー" },
  contactInfo: { en: "Contact Information", es: "Información de Contacto", ja: "連絡先情報" },
  newsletter: { en: "Newsletter", es: "Boletín", ja: "ニュースレター" },
  newsletterDesc: {
    en: "Subscribe to get updates on new products and offers",
    es: "Suscríbete para recibir actualizaciones sobre nuevos productos y ofertas",
    ja: "新商品とオファーの更新を受け取るために購読してください",
  },
  enterEmail: { en: "Enter your email", es: "Ingresa tu correo", ja: "メールアドレスを入力" },
  subscribe: { en: "Subscribe", es: "Suscribirse", ja: "購読" },
  allRightsReserved: { en: "All rights reserved.", es: "Todos los derechos reservados.", ja: "すべての権利を保有。" },
  faq: { en: "FAQ", es: "Preguntas Frecuentes", ja: "よくある質問" },

  // Product Tabs
  popular: { en: "Popular", es: "Popular", ja: "人気" },
  bestDeals: { en: "Best Deals", es: "Mejores Ofertas", ja: "お得情報" },
  newArrivals: { en: "New Arrivals", es: "Nuevos Productos", ja: "新着商品" },
  featured: { en: "Featured", es: "Destacados", ja: "おすすめ" },
  popularProducts: { en: "Popular Products", es: "Productos Populares", ja: "人気商品" },
  popularProductsDesc: {
    en: "Most loved by our customers",
    es: "Los más queridos por nuestros clientes",
    ja: "お客様に最も愛されている商品",
  },
  bestDealsDesc: {
    en: "Amazing discounts and special offers",
    es: "Descuentos increíbles y ofertas especiales",
    ja: "素晴らしい割引と特別オファー",
  },
  newArrivalsDesc: {
    en: "Latest products just added to our store",
    es: "Últimos productos agregados a nuestra tienda",
    ja: "ストアに追加された最新商品",
  },
  featuredProducts: { en: "Featured Products", es: "Productos Destacados", ja: "おすすめ商品" },
  featuredProductsDesc: {
    en: "Hand-picked premium products",
    es: "Productos premium seleccionados a mano",
    ja: "厳選されたプレミアム商品",
  },

  // Contact Page
  sendMessage: { en: "Send Message", es: "Enviar Mensaje", ja: "メッセージを送信" },
  phone: { en: "Phone", es: "Teléfono", ja: "電話" },
  subject: { en: "Subject", es: "Asunto", ja: "件名" },
  message: { en: "Message", es: "Mensaje", ja: "メッセージ" },
  selectSubject: { en: "Select a subject", es: "Selecciona un asunto", ja: "件名を選択" },
  generalInquiry: { en: "General Inquiry", es: "Consulta General", ja: "一般的なお問い合わせ" },
  orderInquiry: { en: "Order Inquiry", es: "Consulta de Pedido", ja: "注文に関するお問い合わせ" },
  returnsRefunds: { en: "Returns & Refunds", es: "Devoluciones y Reembolsos", ja: "返品・返金" },
  partnership: { en: "Partnership", es: "Asociación", ja: "パートナーシップ" },
  writeMessage: {
    en: "Write your message here...",
    es: "Escribe tu mensaje aquí...",
    ja: "ここにメッセージを書いてください...",
  },
  sending: { en: "Sending...", es: "Enviando...", ja: "送信中..." },
  messageSent: { en: "Message Sent!", es: "¡Mensaje Enviado!", ja: "メッセージが送信されました！" },
  messageSentDesc: {
    en: "Thank you for contacting us. We'll get back to you soon.",
    es: "Gracias por contactarnos. Te responderemos pronto.",
    ja: "お問い合わせありがとうございます。すぐにご連絡いたします。",
  },
  emailDesc: {
    en: "Send us an email anytime",
    es: "Envíanos un email cuando quieras",
    ja: "いつでもメールをお送りください",
  },
  phoneDesc: {
    en: "Call us during business hours",
    es: "Llámanos durante horario comercial",
    ja: "営業時間内にお電話ください",
  },
  liveChat: { en: "Live Chat", es: "Chat en Vivo", ja: "ライブチャット" },
  chatAvailable: { en: "Available Now", es: "Disponible Ahora", ja: "利用可能" },
  liveChatDesc: {
    en: "Chat with our support team",
    es: "Chatea con nuestro equipo de soporte",
    ja: "サポートチームとチャット",
  },
  twentyFourSevenSupport: { en: "24/7 Available", es: "Disponible 24/7", ja: "24時間対応" },
  supportDesc: { en: "Round-the-clock assistance", es: "Asistencia las 24 horas", ja: "24時間サポート" },
  businessHours: { en: "Business Hours", es: "Horario Comercial", ja: "営業時間" },
  monday: { en: "Monday", es: "Lunes", ja: "月曜日" },
  tuesday: { en: "Tuesday", es: "Martes", ja: "火曜日" },
  wednesday: { en: "Wednesday", es: "Miércoles", ja: "水曜日" },
  thursday: { en: "Thursday", es: "Jueves", ja: "木曜日" },
  friday: { en: "Friday", es: "Viernes", ja: "金曜日" },
  saturday: { en: "Saturday", es: "Sábado", ja: "土曜日" },
  sunday: { en: "Sunday", es: "Domingo", ja: "日曜日" },
  closed: { en: "Closed", es: "Cerrado", ja: "休業" },
  ourLocation: { en: "Our Location", es: "Nuestra Ubicación", ja: "所在地" },
  getDirections: { en: "Get Directions", es: "Obtener Direcciones", ja: "道順を取得" },
  needQuickHelp: { en: "Need Quick Help?", es: "¿Necesitas Ayuda Rápida?", ja: "すぐにヘルプが必要ですか？" },
  checkFaqDesc: {
    en: "Check our frequently asked questions for instant answers",
    es: "Consulta nuestras preguntas frecuentes para respuestas instantáneas",
    ja: "よくある質問で即座に回答を確認",
  },
  visitFaq: { en: "Visit FAQ", es: "Visitar FAQ", ja: "FAQを見る" },
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
} | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "es", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
