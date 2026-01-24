import type React from "react";
import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-pink-100 bg-white/90 p-5 shadow-[0_10px_40px_rgba(255,95,162,0.1)]",
        className,
      )}
      {...props}
    />
  );
}
