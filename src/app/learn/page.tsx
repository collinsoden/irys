"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Container } from "@/components/ui"
import { learnTopics } from "@/lib/constants" // adjust path accordingly
import { ChevronDown } from "lucide-react"

export default function LearnPage() {
  const [activeTopic, setActiveTopic] = useState<number | null>(null)

  const toggleTopic = (index: number) => {
    setActiveTopic(index === activeTopic ? null : index)
  }

  return (
    <Layout>
      <section className="relative min-h-screen bg-white text-gray-800 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-theme mb-4">Learn Irys</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interactive guide to mastering Irys — uploading, reading, and building with permanence.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {learnTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTopic(index)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{topic.icon}</span>
                    <div>
                      <h2 className="text-xl font-semibold text-theme">{topic.title}</h2>
                      <p className="text-gray-500">{topic.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      activeTopic === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {activeTopic === index && (
                  <motion.div
                    className="mt-4 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {topic.notes}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
