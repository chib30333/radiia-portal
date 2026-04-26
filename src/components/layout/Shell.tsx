"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Footer } from "./Footer";
import { Header } from "./Header";

export type ShellVariant = "default" | "page" | "auth" | "admin";

type ShellProps = {
  children: ReactNode;
  className?: string;
  variant?: ShellVariant;
};

function resolveShellVariant(pathname: string): ShellVariant {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return "admin";
  }

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/forgot-password/") ||
    pathname === "/reset-password"
  ) {
    return "auth";
  }

  if (pathname === "/account" || pathname === "/favorites") {
    return "page";
  }

  return "default";
}

function resolveMainSection(pathname: string) {
  if (pathname === "/order-history" || pathname === "/saved-searches" || pathname === "/favorites") {
    return "items-start";
  }

  return "";
}

const shellVariantClasses: Record<ShellVariant, string> = {
  default: "",
  page: "",
  auth: "mx-auto flex w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16",
  admin: ""
};

export function Shell({ children, className, variant }: ShellProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? resolveShellVariant(pathname);
  const showFooter = resolvedVariant !== "auth" && resolvedVariant !== "admin";
  const showHeader = resolvedVariant !== "admin";
  const mainBackgroundClass =
    resolvedVariant === "auth"
      ? "bg-[#f0ede7]"
      : resolvedVariant === "admin"
        ? "bg-[#f0ede7] items-stretch justify-stretch"
        : "bg-white";

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ede7]">
      {showHeader ? <Header /> : null}
      <main className={cn("flex flex-1 justify-center items-center", mainBackgroundClass, resolveMainSection(pathname))}>
        <div className={cn("flex min-h-full w-full flex-col", shellVariantClasses[resolvedVariant], className)}>
          {children}
        </div>
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}
