import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "reviews.json");

// Ensure the reviews.json file exists
async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify([]));
  }
}

export async function GET() {
  await ensureFile();
  const data = await fs.readFile(filePath, "utf-8");
  const reviews = JSON.parse(data);

  // Only return the latest 100 reviews
  const latest = reviews.slice(-100).reverse();
  return NextResponse.json(latest);
}

export async function POST(req: Request) {
  const { username, review } = await req.json();

  if (!username || !review) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await ensureFile();
  const data = await fs.readFile(filePath, "utf-8");
  const reviews = JSON.parse(data);

  const newReview = {
    id: Date.now(),
    username,
    review,
    createdAt: new Date().toISOString(),
  };

  reviews.push(newReview);
  await fs.writeFile(filePath, JSON.stringify(reviews, null, 2));

  return NextResponse.json(newReview, { status: 201 });
}
