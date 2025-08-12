import { ReactNode } from "react"
import { cn } from "@/utils/cn"

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Container({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  )
} 