"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Container, Button } from "@/components/ui"
import Link from "next/link"

export default function AboutPage() {
  return (
    <Layout>
      <Container className="py-16 space-y-20 bg-gradient-to-br from-theme/90 text-gray-600 via-black to-red-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:max-w-5xl max-w-full mx-auto"
        >
          <h1 className="md:text-4xl text-md font-bold tracking-tight mb-4 text-theme">
            About Iryz Explorer 3D
          </h1>
          <p className="text-lg text-white mb-8">
            Iryz Explorer 3D is an interactive platform designed to help you understand, explore, and work with Irys - the decentralized, permanent data layer for Web3.
            Instead of diving straight into documentation, you can see how Irys works in action, experiment with real uploads, and explore live blockchain data visually.
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
            <h3 className="md:text-3xl text-md font-semibold mb-2 text-theme">🧠
              Learn by Exploring
            </h3>
            <p className="text-white">
              Navigate through live transaction data, see how files are stored permanently, and get a visual understanding of the Irys network. The explorer brings blockchain concepts to life.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="md:text-3xl text-md font-semibold mb-2 text-theme">
              📦  Hands on Uploads
            </h3>
             <p className="text-white">
              Upload images, JSON files, or other assets directly to Irys and watch them appear in the live feed. Perfect for testing, learning, or demonstrating permanent storage in real time.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="md:text-3xl text-md font-semibold mb-2 text-theme">🚀 Practical Learning</h3>
            <p className="text-white">
              Go beyond theory with interactive examples, step-by-step guides, and live API testing. Whether you’re new to Web3 or already building, you’ll learn how to integrate Irys into real projects.
            </p>
          </div>

          <div className="bg-background border p-6 rounded-lg shadow-sm">
            <h3 className="md:text-3xl text-md font-semibold mb-2 text-theme">🌐 Built for the Irys Ecosystem</h3>
            <p className="text-white">
              While the official Irys Explorer focuses on analytics and network activity, Iryz Explorer 3D is all about understanding how to use Irys - from uploading data to exploring transactions and testing integrations.
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
          <h3 className="md:text-3xl text-md font-bold mb-4 text-theme">
            Ready to begin your IrysQuest?
          </h3>
          <p className="text-white mb-6">
            Head over to the Learn page and start exploring the future of data permanence.
          </p>
          <Link href="/learn">
            <Button size="lg">Start Learning</Button>
          </Link>
        </motion.section>

          {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:max-w-5xl max-w-full mx-auto"
        >
        <h2 className="md:text-4xl text-md font-bold tracking-tight mb-4 text-theme mt-8">
          Why Iryz Explorer 3D?
        </h2>
        <p className="text-base leading-relaxed text-white">
          Iryz Explorer 3D was created to make decentralized storage approachable and interactive.
          Instead of just reading technical specs, you can see, touch, and test Irys in a way that builds real understanding.
          <br /><br />
          Whether you&apos;re experimenting on testnet, exploring transaction data, or integrating uploads into your app, this platform makes learning Irys engaging, visual, and hands-on.
        </p>

        </motion.section>
      </Container>
    </Layout>
  )
}
