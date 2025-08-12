"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Container, Button } from "@/components/ui"
import Link from "next/link"

export default function AboutPage() {
  return (
    <Layout>
      <Container className="py-16 space-y-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-theme">
            About Iryz Explorer 3D
          </h1>
          <p className="text-lg text-black">
            Iryz Explorer 3D is an interactive educational tool built to help developers, creators, and curious minds understand and explore how Irys works — the decentralized, permanent data layer for Web3.
          </p>

        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-muted rounded-xl p-8 shadow-md"
        >
        <h2 className="text-2xl font-semibold mb-4 text-theme">Why Iryz Explorer 3D?</h2>
        <p className="text-base leading-relaxed text-black">
          Iryz Explorer 3D was created to make decentralized storage easier to understand — not just through code or docs, but through interaction and experience. 
          <br /><br />
          While the official Irys explorer focuses on live transactions and analytics, Iryz Explorer 3D helps you explore how Irys works behind the scenes, with practical tools and 3D visualizations.
          <br /><br />
          Whether you're a developer uploading your first asset, a builder testing real-world use cases, or just curious about how permanent Web3 storage works — this platform gives you a hands-on, visual way to learn and build.
        </p>

        </motion.section>

        {/* Key Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-theme">🧠 Learn by Exploring</h3>
            <p className="text-muted-foreground">
              Iryz Explorer 3D gives you an intuitive way to understand how Irys works. Instead of reading docs first, interact with visual flows and live data.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-theme">📦 Try Real Use Cases</h3>
            <p className="text-muted-foreground">
              Upload images, fetch metadata, and test SDK functions — all within a hands-on interface. It's built to help you apply Irys in real projects.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-theme">🚀 Built for Developers</h3>
            <p className="text-muted-foreground">
              See how real integrations work with guided examples, live API tests, and tips for using Irys with frameworks you're already familiar with.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-theme">🌐 Complements the Irys Ecosystem</h3>
            <p className="text-muted-foreground">
              While the core explorer tracks data and transactions, Iryz Explorer 3D helps you learn how to use Irys — and experiment with it visually.
            </p>
          </div>

        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center pt-12"
        >
          <h3 className="text-2xl font-bold mb-4 text-theme">
            Ready to begin your IrysQuest?
          </h3>
          <p className="text-theme-brown mb-6">
            Head over to the Learn page and start exploring the future of data permanence.
          </p>
          <Link href="/learn">
            <Button size="lg">Start Learning</Button>
          </Link>
        </motion.section>
      </Container>
    </Layout>
  )
}
