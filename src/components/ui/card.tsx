import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-[#e5e2dc] bg-white text-card-foreground backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}
