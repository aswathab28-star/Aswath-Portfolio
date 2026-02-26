import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type GradientTextProps = {
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
  className?: string
  children: ReactNode
}

export default function GradientText({
  colors = ["#5227FF", "#FF9FFC", "#7d58f9"],
  animationSpeed = 9,
  showBorder = false,
  className,
  children,
}: GradientTextProps) {
  const style: CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "200% 200%",
    animation: `gradient-text-shift ${animationSpeed}s ease infinite`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    WebkitTextStroke: showBorder ? "1px rgba(0,0,0,0.25)" : undefined,
  }

  return (
    <span className={cn("gradient-text", className)} style={style}>
      {children}
    </span>
  )
}
