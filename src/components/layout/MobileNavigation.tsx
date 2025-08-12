"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react"
import { cn } from "@/utils/cn"
import { MenuItem } from "@/types/navigation"
import { mainNavigation } from "@/lib/navigation"

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Handle body scroll prevention using CSS classes
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }

    return () => {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id} className="border-b border-gray-100 last:border-b-0">
        <div className="flex items-center justify-between">
          <Link
            href={item.href}
            onClick={closeMenu}
            className={cn(
              "flex-1 py-4 text-base font-medium text-gray-900",
              level > 0 && "pl-6"
            )}
          >
            {item.label}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          )}
          {item.isExternal && <ExternalLink className="h-4 w-4 text-gray-400" />}
        </div>

        {hasChildren && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden bg-gray-50"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={closeMenu}
                    className="block border-b border-gray-100 py-3 pl-6 text-sm text-gray-700 hover:bg-gray-100"
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
    <div className={cn("lg:hidden", className)}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-md text-theme hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black bg-opacity-50"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[70] w-80 bg-white shadow-xl flex flex-col"
              style={{ 
                height: '100vh',
                maxHeight: '100vh'
              }}
              data-mobile-menu
            >
              {/* Menu Header */}
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items Container */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <nav className="p-4">
                  {mainNavigation.map((item) => renderMenuItem(item))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
} 