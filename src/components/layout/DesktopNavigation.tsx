"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import { cn } from "@/utils/cn"
import { MenuItem } from "@/types/navigation"
import { mainNavigation } from "@/lib/navigation"

interface DesktopNavigationProps {
  className?: string
}

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleMouseEnter = (itemId: string) => {
    setActiveDropdown(itemId)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = activeDropdown === item.id

    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => handleMouseEnter(item.id)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-1 px-4 py-2 text-sm font-medium font-inter text-theme transition-colors hover:text-gray-300",
            item.isHighlighted && "text-red-600"
          )}
        >
          {item.label}
          {hasChildren && (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isActive && "rotate-180"
              )}
            />
          )}
          {item.isExternal && <ExternalLink className="h-3 w-3" />}
        </Link>

        {hasChildren && (
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full z-50 min-w-48 rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-red-600"
                  >
                    {child.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

  return (
    <nav className={cn("hidden lg:flex lg:items-center lg:space-x-1", className)}>
      {mainNavigation.map(renderMenuItem)}
    </nav>
  )
} 