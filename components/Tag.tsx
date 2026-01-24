import type React from "react";
import { cn } from "@/lib/cn";

type TagProps = React.HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600",
        className,
      )}
      {...props}
    />
  );
}
