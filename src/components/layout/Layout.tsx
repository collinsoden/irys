import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutProps {
  children: ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className={`pt-16 ${className || ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
} 