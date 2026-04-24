import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[96px] w-full resize-none rounded-xl border border-[#e0ddd8] bg-white px-4 py-3 text-base leading-[1.6] text-[#050a30] outline-none transition focus:border-primary/50 focus:ring-4 focus:ring-primary/10 placeholder:text-[#aaa]",
        className
      )}
      {...props}
    />
  );
}
