import type { NavItem } from "@/types/navigation";

export const primaryNavigation: NavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "Portal overview and wholesale highlights"
  },
  {
    href: "/gemstones",
    label: "Gemstones",
    description: "Colored stone search and discovery"
  },
  {
    href: "/natural-diamonds",
    label: "Natural Diamonds",
    description: "Mined diamond inventory"
  },
  {
    href: "/lab-diamonds",
    label: "Lab Diamonds",
    description: "Lab-grown diamond inventory"
  },
  {
    href: "/favorites",
    label: "Favorites",
    description: "Saved inventory and buyer shortlists"
  },
  {
    href: "/cart",
    label: "Cart",
    description: "Quotation and order staging"
  },
  {
    href: "/account",
    label: "Account",
    description: "Buyer profile, pricing, and approvals"
  }
];
