"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Container } from "@/components/ui"

export default function Explorer() {
  return (
    <Layout>
      <Container className="py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-full text-center"
        >
          <h1 className="text-4xl font-bold text-theme mb-4">Irys Explorer</h1>
          <p className="text-muted-foreground text-lg mb-8 text-theme-black">
            Explore the Irys network and its data.
          </p>
          {/* Load the Irys explorer in a canvas */}
            <div className="bg-background border p-1 shadow-md">
            <iframe
              src="https://testnet-explorer.irys.xyz/"
              className="w-full h-screen scrollbar-hide lg:overflow-hidden"
              title="Irys Explorer"
              style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              }}
            />
            <style jsx>{`
              @media (min-width: 1024px) {
              iframe::-webkit-scrollbar {
                display: none;
              }
              }
            `}</style>
            </div>
        </motion.div>
      </Container>
    </Layout>
  )
}
