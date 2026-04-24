import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { id: 1, label: "Enter email" },
    { id: 2, label: "Check email" },
    { id: 3, label: "New password" }
  ] as const;

  return (
    <div className="mx-auto mb-7 flex max-w-[420px] items-center">
      {steps.map((item, index) => {
        const done = item.id < step;
        const active = item.id === step;

        return (
          <div key={item.id} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold",
                  active ? "bg-[#050a30] text-white" : done ? "bg-[#2a9d5c] text-white" : "bg-[#e5e2dc] text-[#aaa]"
                ].join(" ")}
              >
                {done ? "✓" : item.id}
              </div>
              <span
                className={[
                  "text-[11px] whitespace-nowrap",
                  active ? "font-bold text-[#050a30]" : done ? "text-[#2a9d5c]" : "text-[#aaa]"
                ].join(" ")}
              >
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 ? <div className="mx-3 h-px flex-1 bg-[#e5e2dc]" /> : null}
          </div>
        );
      })}
    </div>
  );
}

type PasswordResetFrameProps = {
  step: 1 | 2 | 3;
  icon: ReactNode;
  title: string;
  description: ReactNode;
  children: ReactNode;
};

export function PasswordResetFrame({ step, icon, title, description, children }: PasswordResetFrameProps) {
  return (
    <div className="w-full px-4 py-10 sm:px-6">
      <StepIndicator step={step} />
      <div className="mx-auto max-w-[420px] flex flex-col gap-4">
        <Card className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white p-0 shadow-none">
          <div className="border-b border-[#f0ede7] px-9 py-8 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e2dc] bg-[#fafaf8]">
              {icon}
            </div>
            <h1 className="font-display text-[24px] font-normal tracking-[0.04em] text-[#050a30]">{title}</h1>
            <div className="mt-2 text-xs font-light leading-6 text-[#aaa]">{description}</div>
          </div>
          <div className="px-9 py-7">{children}</div>
        </Card>
        <div className="text-center">
          <span className="text-sm text-[#888]">
            For assistance, please email{" "}
            <a href="mailto:production@radiia.co" className="text-[#233dff]">
              production@radiia.co
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export function PasswordActionRow({
  primaryLabel,
  secondaryLabel,
  secondaryHref = "/login"
}: {
  primaryLabel: string;
  secondaryLabel?: string;
  secondaryHref?: Route;
}) {
  return (
    <div className="space-y-4">
      <Button className="w-full py-3 text-sm uppercase tracking-[0.08em]">{primaryLabel}</Button>
      {secondaryLabel ? (
        <div className="text-center text-xs text-[#aaa]">
          <Link href={secondaryHref} className="font-bold text-[#233dff]">{secondaryLabel}</Link>
        </div>
      ) : null}
    </div>
  );
}
