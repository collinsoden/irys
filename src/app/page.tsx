"use client"

import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Button, Container } from "@/components/ui"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ReviewForm } from "@/components/reviews/ReviewForm"
import { ReviewSlider } from "@/components/reviews/ReviewsSlider"

export default function Home() {
  const [stats, setStats] = useState({
    transactions: [], totalTx: 0, activeAddresses: 0, totalVolume: 0
  });

  // Get live stats from Iryz blockchain
  const fetchStats = async () => {
    const res = await fetch('/api/stats', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }
    const data = await res.json();
    setStats(data);
  }
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-theme/90 via-black to-red-20">
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
              IrysExplorer 3D
            </h1>
            <p className="mt-6 text-lg leading-8 text-white-600 sm:text-xl max-w-3xl mx-auto">
              Your gateway to exploring the Irys datachain in a whole new way. Instantly see live stats, interactive 3D visualizations, browse uploader profiles, and simulate uploads. Whether you&apos;re a developer, data enthusiast, or just curious, this site lets you discover, interact with, and build on Irys with powerful tools, and a user-friendly interface. Get a real feel for the network!
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/3d#canva">
                <Button className="bg-theme/40 text-white hover:bg-theme-red/90 transition md:w-80 w-auto">
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
            <h2 className="text-3xl font-bold text-theme mb-6">
              Live Irys Stats
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Real-time insight into uploads, downloads, and datachain activity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-theme-black shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">
                  ⏫ Total Transactions</h3>
                <p className="mt-2 text-2xl font-bold text-white">
                  {stats?.totalTx?.toLocaleString() || 0}
                </p>
              </div>
              <div className="p-6 bg-theme-black shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">
                  <span role="img" aria-label="Volume">📦</span> Total Volume
                </h3>
                <p className="mt-2 text-2xl font-bold text-white">
                  {stats?.totalVolume?.toLocaleString() || 0}
                </p>
              </div>
              <div className="p-6 bg-theme-black shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-theme">
                  🌐 Active Addresses
                </h3>
                <p className="mt-2 text-2xl font-bold text-white">
                  {stats?.activeAddresses?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Review Section */}
      <ReviewForm />
      <ReviewSlider />
      {/* Differences Section */}
      <section className="py-20 bg-gradient-to-tr from-white to-red-50">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
           <h2 className="text-3xl font-bold text-theme mb-6">
            Why Iryz Explorer 3D?
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            Iryz Explorer 3D turns learning about Irys into an interactive experience — see the data layer in action, experiment with uploads, and explore how decentralized storage works.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left text-gray-800">
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              🧭 <strong>3D Visual Interface:</strong> Navigate Irys data flows and transactions in an intuitive, spatial view.
            </li>
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              📤 <strong>Hands-on Uploads:</strong> Try uploading files, metadata, and JSON to see how permanence works.
            </li>
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              🔍 <strong>Live Data Exploration:</strong> Inspect recent uploads, transaction details, and tags directly.
            </li>
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              🔧 <strong>Developer Tools:</strong> Access raw transaction data, GraphQL queries, and SDK examples.
            </li>
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              📚 <strong>Guided Learning:</strong> Built-in topics explain Irys concepts with real examples and code snippets.
            </li>
            <li className="bg-theme-black p-5 rounded-xl shadow text-theme">
              🌐 <strong>Ecosystem Context:</strong> Understand where Irys fits in Web3 and how to integrate it into projects.
            </li>
          </ul>

          </motion.div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-theme/90 via-black to-red-20 text-white text-center">
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
              <Button className="bg-theme-black text-theme hover:bg-theme-black/90 transition">
                Launch Explorer
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </Layout>
  )
}
