"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Button, Container } from "@/components/ui"
import { useRef, useState } from "react"

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadUrl(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setUploading(true) 
    
    try {
      const file = selectedFile
      const reader = new FileReader()
      console.log("Selected file:", file, selectedFile);
      reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(",")[1]
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: base64,
          fileType: file.type ?? "application/octet-stream",
          fileName: file.name,
          fileSize: file.size,
          owner: userName || "Anonymous",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const result = await res.json()
    setUploadUrl(result.id)
  }

  reader.readAsDataURL(file)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Layout>
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-theme mb-4">Upload to Irys</h1>
          <p className="text-muted-foreground text-lg mb-8 text-theme-black">
            Connect your wallet, set your name, and upload to Irys Testnet permanently.
          </p>

          <div className="bg-background border p-6 rounded-xl shadow-md">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="flex flex-col items-center gap-4">
              <input
                type="text"
                placeholder="Enter your display name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 rounded-md w-full max-w-xs text-center"
              />

              <Button onClick={() => fileInputRef.current?.click()}>
                {selectedFile ? "Change File" : "Choose File"}
              </Button>

              {selectedFile && (
                <p className="text-theme font-medium">{selectedFile.name}</p>
              )}

              <Button
                disabled={!selectedFile || uploading}
                onClick={handleUpload}
                variant="secondary"
              >
                {uploading ? "Uploading..." : "Upload to Irys"}
              </Button>

              {uploadUrl && (
                <div className="text-sm text-theme/90 mt-4">
                  ✅ Uploaded successfully!
                  <br />
                  <a
                    href={uploadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme underline"
                  >
                    View on Irys
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </Layout>
  )
}
