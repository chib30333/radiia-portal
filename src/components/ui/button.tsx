import type { Route } from "next";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "noEffect";
};

type ButtonLinkProps = {
  href: Route;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "noEffect";
};

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
  secondary:
    "bg-card text-foreground ring-1 ring-inset ring-border hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  noEffect: "",
};

const baseClassName =
  "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClassName, variants[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(baseClassName, variants[variant], className)}>
      {children}
    </Link>
  );
}
