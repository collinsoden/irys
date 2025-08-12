import { cn } from "@/utils/cn"

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border bg-background shadow-md", className)}>
      {children}
    </div>
  )
}
