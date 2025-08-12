import { cn } from "@/utils/cn"
import React from "react"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({
  label,
  error,
  className,
  ...props
}: CustomInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={cn(
          "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-theme",
          "bg-background text-muted-foreground placeholder:text-muted-foreground",
          "transition-colors duration-200 ease-in-out",
          error ? "border-red-500 focus:ring-red-400" : "",
          className
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
