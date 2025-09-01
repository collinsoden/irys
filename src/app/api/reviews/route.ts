// app/api/reviews/route.ts
import { createClient } from "redis";
import { NextResponse } from "next/server";

let redis: any;

async function getRedis() {
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL });
    redis.on("error", (err: any) => console.error("Redis Client Error", err));
    await redis.connect();
  }
  return redis;
}

// GET: Fetch all reviews
export async function GET() {
  const client = await getRedis();
  const reviews = await client.lRange("irys-3d-db:reviews", 0, -1);
  const parsed = reviews.map((r: any) => JSON.parse(r));
  return NextResponse.json(parsed);
}

// POST: Add a new review
export async function POST(req: Request) {
  const client = await getRedis();
  const body = await req.json();

  if (!body.username || !body.review) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newReview = {
    id: Date.now().toString(),
    username: body.username,
    review: body.review,
    createdAt: new Date().toISOString(),
  };

  await client.rPush("irys-3d-db:reviews", JSON.stringify(newReview));

  return NextResponse.json(newReview, { status: 201 });
}
