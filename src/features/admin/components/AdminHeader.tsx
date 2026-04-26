"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    match: (p) => p === "/admin",
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
    match: (p) => p === "/admin/accounts" || p.startsWith("/admin/accounts/"),
  },
  {
    href: "/admin/requests",
    label: "Requests",
    match: (p) => p === "/admin/requests" || p.startsWith("/admin/requests/"),
  },
  {
    href: "/admin/inventory",
    label: "Inventory",
    match: (p) => p === "/admin/inventory" || p.startsWith("/admin/inventory/"),
  },
];

function AdminHeader() {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full flex items-stretch bg-[#050a30] gap-8 px-6 sm:px-6 lg:px-12">
      <Link
        href="/admin"
        className="flex items-center border-r border-white/10 p-6"
      >
        <span className="font-display text-3xl tracking-[0.18em] text-[#ffc897]">
          RADIIA
        </span>
        <span className="ml-2 mt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-[#ffc897]/50">
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
                "flex items-center whitespace-nowrap px-5 text-base uppercase tracking-[0.05em] transition-colors",
                active
                  ? "border-b-2 border-[#ffc897] font-bold text-[#ffc897]"
                  : "font-normal text-white/50 hover:bg-white/5 hover:text-white/80",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <div className="flex p-2 items-center justify-center rounded-full border border-[#ffc897]/30 bg-[#ffc897]/20 text-base font-bold text-[#ffc897]">
            RA
          </div>
          <span className="text-base text-white/60">RADIIA Admin</span>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
