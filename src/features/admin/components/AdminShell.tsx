"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminNavItem = {
  href: "/admin" | "/admin/accounts" | "/admin/requests" | "/admin/inventory";
  label: string;
  match: (pathname: string) => boolean;
};

const adminNavItems: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    match: (p) => p === "/admin"
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
    match: (p) => p === "/admin/accounts" || p.startsWith("/admin/accounts/")
  },
  {
    href: "/admin/requests",
    label: "Requests",
    match: (p) => p === "/admin/requests" || p.startsWith("/admin/requests/")
  },
  {
    href: "/admin/inventory",
    label: "Inventory",
    match: (p) => p === "/admin/inventory" || p.startsWith("/admin/inventory/")
  }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10">
      <div className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white">
        <div className="flex h-14 items-stretch bg-[#050a30]">
          <Link
            href="/admin"
            className="flex items-center border-r border-white/10 px-6"
          >
            <span className="font-display text-lg tracking-[0.18em] text-[#ffc897]">RADIIA</span>
            <span className="ml-2 mt-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#ffc897]/50">
              Admin
            </span>
          </Link>
          <nav className="flex items-stretch">
            {adminNavItems.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center whitespace-nowrap px-5 text-[11px] uppercase tracking-[0.05em] transition-colors",
                    active
                      ? "border-b-2 border-[#ffc897] font-bold text-[#ffc897]"
                      : "font-normal text-white/50 hover:bg-white/5 hover:text-white/80"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-4 px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ffc897]/30 bg-[#ffc897]/20 text-[10px] font-bold text-[#ffc897]">
                RA
              </div>
              <span className="text-[11px] text-white/60">RADIIA Admin</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AdminPageHeader({
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
    <div className="flex items-baseline justify-between gap-4 border-b border-[#f0ede7] px-8 pb-5 pt-6">
      <div>
        {back ? (
          <Link
            href={back.href as never}
            className="mb-1.5 inline-block text-[11px] text-[#233dff] hover:underline"
          >
            ← {back.label}
          </Link>
        ) : null}
        <div className="flex items-center gap-3">
          <h1 className="font-display text-[26px] tracking-[0.04em] text-[#050a30]">{title}</h1>
          {badges}
        </div>
        {subtitle ? (
          <div className="mt-1 text-[11px] font-light text-[#aaa]">{subtitle}</div>
        ) : null}
      </div>
      {actions ? <div className="flex gap-2.5">{actions}</div> : null}
    </div>
  );
}

export function AdminContentArea({ children }: { children: ReactNode }) {
  return <div className="min-h-[400px] bg-[#fafaf8] p-6 md:p-8">{children}</div>;
}
