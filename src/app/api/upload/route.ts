import { NextRequest, NextResponse } from "next/server"
import { Uploader } from "@irys/upload"
import { Ethereum } from "@irys/upload-ethereum"

export async function POST(req: NextRequest) {
  const { data, fileType, fileName, fileSize, owner = "Anonymous" } = await req.json();

  const irysUploader = await Uploader(Ethereum).withWallet(process.env.PRIVATE_KEY);
  const buffer = new Blob([data], { type: fileType });

  console.log("Uploading file:", { fileName, fileType, fileSize, data: buffer, owner });
  const tags = [
    { name: "File-Owner", value: owner },
    { name: "File-Type", value: fileType },
    { name: "File-Name", value: fileName },
    { name: "File-Size", value: fileSize.toString() },
  ]

  const res = await irysUploader.uploadFile(URL.createObjectURL(buffer), { tags })
  // return NextResponse.json({ error: "Upload functionality is not implemented yet." });

  return NextResponse.json({ id: res.id, url: `https://gateway.irys.xyz/${res.id}` })
}