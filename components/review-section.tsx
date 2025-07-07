"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-provider"

interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: "John Doe",
    avatar: "/placeholder.svg",
    rating: 5,
    comment: "Excellent product! Highly recommended.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: "2",
    user: "Jane Smith",
    avatar: "/placeholder.svg",
    rating: 4,
    comment: "Good quality, fast shipping.",
    date: "2024-01-10",
    helpful: 8,
  },
]

export default function ReviewSection({ productId }: { productId: string }) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const { t } = useLanguage()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    console.log("New review:", { rating, comment: newReview })
    setNewReview("")
    setRating(0)
  }

  return (
    <div className="space-y-6">
      {/* Write Review */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">{t("writeReview")}</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("rating")}</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
                    <Star
                      className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium mb-2">
                {t("yourReview")}
              </label>
              <Textarea
                id="review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder={t("writeYourReview")}
                rows={4}
              />
            </div>
            <Button type="submit" disabled={!rating || !newReview.trim()}>
              {t("submitReview")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t("customerReviews")}</h3>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.comment}</p>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {t("helpful")} ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
