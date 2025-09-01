import { NextRequest, NextResponse } from "next/server"
import { Uploader } from "@irys/upload"
import { Ethereum } from "@irys/upload-ethereum"

export async function POST(req: NextRequest) {
  try {
  const { data, fileType, fileName, fileSize, owner = "Anonymous" } = await req.json();

  const irysUploader = await Uploader(Ethereum).withWallet(process.env.PRIVATE_KEY);
    const buffer = Buffer.from(data, "base64");

  const tags = [
    { name: "File-Owner", value: owner },
    { name: "File-Type", value: fileType },
    { name: "File-Name", value: fileName },
    { name: "File-Size", value: fileSize.toString() },
  ]
    const res = await irysUploader.upload(buffer, { tags })

    return NextResponse.json({
      id: res.id, url: `https://gateway.irys.xyz/${res.id}`
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}