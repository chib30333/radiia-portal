import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-[#e0ddd8] bg-white px-4 text-base outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10",
        className
      )}
      {...props}
    />
  );
}
