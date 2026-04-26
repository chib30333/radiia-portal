"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function AdminPageHeaderMenu({
  title,
  subtitle,
  back,
  badges,
  actions
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  back?: { href: string; label: string };
  badges?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mx-auto flex items-baseline justify-between border-b border-[#f0ede7] gap-8 px-6 sm:px-6 lg:px-12">
      <div className="p-6">
        {back ? (
          <Link
            href={back.href as never}
            className="mb-1.5 inline-block text-xs text-[#233dff] hover:underline"
          >
            ← {back.label}
          </Link>
        ) : null}
        <div className="flex items-center gap-3">
          <h1 className="font-display text-4xl tracking-[0.04em] text-[#050a30]">{title}</h1>
          {badges}
        </div>
        {subtitle ? (
          <div className="mt-1 text-base font-light text-[#aaa]">{subtitle}</div>
        ) : null}
      </div>
      {actions ? <div className="flex gap-2.5">{actions}</div> : null}
    </div>
  );
}

export function AdminContentArea({ children }: { children: ReactNode }) {
  return <div className="min-h-[400px] bg-[#fafaf8] px-6 sm:px-6 lg:px-12">{children}</div>;
}
