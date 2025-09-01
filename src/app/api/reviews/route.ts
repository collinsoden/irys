// app/api/reviews/route.ts
import { createClient } from "redis";
import { NextResponse } from "next/server";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

// Add a new review
export async function POST(req: Request) {
  const { username, review } = await req.json();

  if (!username || !review) {
    return NextResponse.json({ error: "Username and review are required" }, { status: 400 });
  }

  const id = `review:${Date.now()}`;
  await redis.hSet(id, { username, review });
  await redis.lPush("db:reviews", id);

  return NextResponse.json({ id, username, review });
}

// Get all reviews
export async function GET() {
  const ids = await redis.lRange("db:reviews", 0, -1);
  const reviews = [];

  for (const id of ids) {
    const data = await redis.hGetAll(id);
    if (data && data.username && data.review) {
      reviews.push({ id, ...data });
    }
  }

  return NextResponse.json(reviews);
}

// Delete a review (admin only)
export async function DELETE(req: Request) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json({ error: "Review ID and password required" }, { status: 400 });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Remove review
  await redis.del(id);
  await redis.lRem("db:reviews", 0, id);

  return NextResponse.json({ success: true, deletedId: id });
}
