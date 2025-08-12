import { cn } from "@/utils/cn"

export function CardContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  )
}