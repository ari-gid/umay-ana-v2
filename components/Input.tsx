import type React from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      {label ? <span>{label}</span> : null}
      <input
        className={cn(
          "rounded-2xl border border-pink-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}
