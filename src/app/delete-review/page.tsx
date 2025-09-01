"use client";

import { useState, useEffect } from "react";

export default function DeletePage() {
  const [reviews, setReviews] = useState<{ id: string; username: string; review: string }[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all reviews
  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      console.log(data);
      setReviews(data);
      if (data.length > 0) setSelectedId(data[0].id); // Select first review by default
    }
    fetchReviews();
  }, []);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedId, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setReviews(reviews.filter(r => r.id !== selectedId));
      if (reviews.length > 1) {
        setSelectedId(reviews[0].id);
      } else {
        setSelectedId("");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Delete a Review
        </h2>

        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Review</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            >
              {reviews.length === 0 ? (
                <option>No reviews available</option>
              ) : (
                reviews.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.username}: {r.review.slice(0, 30)}...
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            Delete Review
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
