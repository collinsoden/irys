import { cn } from "@/utils/cn"

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("md:mx-auto mx-5 md:rounded-xl md:border border-b border-t bg-background shadow-md", className)}>
      {children}
    </div>
  )
}
