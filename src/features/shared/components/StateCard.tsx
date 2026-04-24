import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StateCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function StateCard({
  eyebrow,
  title,
  description,
  actions,
  icon,
  className
}: StateCardProps) {
  return (
    <Card className={cn("mx-auto max-w-3xl text-center", className)}>
      <div className="mx-auto max-w-xl space-y-4 py-4 sm:py-8">
        {icon ? <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fafaf8] text-[#233dff]">{icon}</div> : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#aaa]">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-4xl font-normal tracking-[0.04em] text-[#050a30] sm:text-5xl">
          {title}
        </h1>
        <p className="text-base leading-7 text-[#888] sm:text-lg">{description}</p>
        {actions ? <div className="flex flex-wrap items-center justify-center gap-3 pt-2">{actions}</div> : null}
      </div>
    </Card>
  );
}
