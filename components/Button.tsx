import type React from "react";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 disabled:opacity-60";
  const variants: Record<string, string> = {
    primary: "bg-pink-500 text-white shadow-sm",
    outline: "border border-pink-300 text-pink-600 bg-white",
    ghost: "text-pink-600 hover:bg-pink-50",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
