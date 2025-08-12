"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { DesktopNavigation } from "./DesktopNavigation"
import { MobileNavigation } from "./MobileNavigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? "bg-black/90 backdrop-blur-md shadow-xl border-b border-theme" 
          : "bg-black"
        }
      `}
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo_white.png" 
              alt="Irys Logo" 
              width={150} 
              height={40} 
              priority 
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  )
}
