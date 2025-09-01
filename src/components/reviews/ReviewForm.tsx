"use client"

import { useState } from "react"
import { Button, Container } from "@/components/ui"

export function ReviewForm() {
  const [username, setUsername] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, review }),
      })

      if (!res.ok) throw new Error("Failed to save review")
      setMessage("✅ Review submitted!")
      setUsername("")
      setReview("")
    } catch (err) {
      setMessage("❌ Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-10 text-center">
      <h2 className="text-2xl font-bold text-theme mb-4">Share Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Your X username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 rounded border bg-theme/80 text-black"
        />
        <textarea
          placeholder="What do you think about the UI? What other feature would you like to see? All suggestions are welcome!"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          rows={3}
          className="w-full p-2 rounded border bg-theme/80 text-black"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-theme text-black hover:bg-theme"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
      {message && <p className="mt-3 text-theme">{message}</p>}
    </Container>
  )
}
