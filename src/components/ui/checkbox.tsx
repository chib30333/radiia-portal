import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "app-checkbox h-5 mt-2 w-5 cursor-pointer rounded-sm border border-[#cfd3dc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#233dff]/20",
        className
      )}
      {...props}
    />
  );
}
