"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Button, Container } from "@/components/ui"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-theme leading-tight mb-4">
              Welcome to IrysExplorer 3D
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 sm:text-xl max-w-3xl mx-auto">
              Discover, interact with, and build on the Irys datachain like never before — with a 3D-first experience that brings data to life.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/explorer">
                <Button className="bg-theme text-white hover:bg-theme-red/90 transition md:w-80 w-auto">
                  Explore Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Live Stats Section */}
      <section className="py-20 bg-theme/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-theme mb-6">Live Irys Stats</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Real-time insight into uploads, downloads, and datachain activity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-white shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">⏫ Total Uploads</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">12.4M</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">📥 Downloads</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">8.9M</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">🌐 Nodes Active</h3>
                <p className="mt-2 text-2xl font-bold text-gray-900">218</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Differences Section */}
      <section className="py-20 bg-gradient-to-tr from-white to-red-50">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-theme mb-6">Why IrysExplorer 3D?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-10">
              We go beyond static data — you explore profiles, simulate uploads, and unlock interactive insights from the Irys datachain.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left text-gray-800">
              <li className="bg-white p-5 rounded-xl shadow">
                🎮 <strong>Gamified Data Discovery:</strong> Earn badges and rewards while exploring the network.
              </li>
              <li className="bg-white p-5 rounded-xl shadow">
                🧭 <strong>3D Visual Interface:</strong> Navigate the network visually and intuitively.
              </li>
              <li className="bg-white p-5 rounded-xl shadow">
                👤 <strong>Uploader Profiles:</strong> Track uploader history, behavior, and reputation.
              </li>
              <li className="bg-white p-5 rounded-xl shadow">
                🔧 <strong>Developer Mode:</strong> Decode payloads, simulate uploads, and access raw data.
              </li>
              <li className="bg-white p-5 rounded-xl shadow">
                📂 <strong>Smart Categorization:</strong> Instantly know what can be done with each file.
              </li>
              <li className="bg-white p-5 rounded-xl shadow">
                🧠 <strong>AI Insight (Planned):</strong> Suggest actions for each upload via LLM analysis.
              </li>
            </ul>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-theme text-white text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Start Exploring the Datachain</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Dive into a new era of data transparency, programmability, and visual exploration — powered by Irys.
            </p>
            <Link href="/explore">
              <Button className="bg-white text-theme hover:bg-white/90 transition">
                Launch Explorer
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </Layout>
  )
}
