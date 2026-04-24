import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
  description: string;
};
