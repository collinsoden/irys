"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui"

export function ReviewSlider() {
  const [reviews, setReviews] = useState<any[]>([])

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews")
      const data = await res.json()
      setReviews(data)
    }
    fetchReviews()
  }, [])

  if (!reviews.length) return null

  return (
    <section className="py-20 bg-theme/5">
      <Container>
        <h2 className="text-3xl font-bold text-theme mb-10 text-center">
          Community Reviews
        </h2>
        <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory">
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              className="min-w-[300px] max-w-sm bg-theme-black text-white p-6 rounded-xl shadow-md snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://unavatar.io/twitter/${r.username}`}
                  alt={r.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold text-theme">@{r.username}</span>
              </div>
              <p className="text-sm text-gray-200">{r.review}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
