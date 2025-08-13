import React from "react"
import { cn } from "@/utils/cn"

interface ContainerProps {
  children?: React.ReactNode
  className?: string
}

export function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-full px-4",
        className
      )}
    >
      {children}
    </div>
  )
}