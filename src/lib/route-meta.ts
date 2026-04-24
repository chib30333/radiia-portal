export type RouteMeta = {
  title: string;
  eyebrow: string;
  description: string;
};

export const routeMeta = {
  home: {
    title: "RADIIA wholesale portal",
    eyebrow: "B2B inventory workspace",
    description:
      "A polished foundation for authenticated buyers, live inventory discovery, and future pricing intelligence."
  },
  login: {
    title: "Sign in",
    eyebrow: "Buyer access",
    description: "Authenticate account teams, sellers, and approved wholesale customers."
  },
  signup: {
    title: "Create account",
    eyebrow: "Onboarding",
    description: "Collect business credentials, approval status, and trading preferences."
  },
  gemstones: {
    title: "Gemstones search",
    eyebrow: "Catalog",
    description: "Search and filter colored stones with room for advanced faceting, origin, and certification filters."
  },
  naturalDiamonds: {
    title: "Natural diamonds search",
    eyebrow: "Catalog",
    description: "Support mined diamond workflows, supplier feeds, and customer-specific pricing rules."
  },
  labDiamonds: {
    title: "Lab diamonds search",
    eyebrow: "Catalog",
    description: "Prepare for lab-grown inventory feeds, promotional programs, and wholesale availability bands."
  },
  favorites: {
    title: "Favorites",
    eyebrow: "Buyer tools",
    description: "Persist saved searches, shortlist items, and salesperson-curated assortments."
  },
  cart: {
    title: "Cart",
    eyebrow: "Quotation",
    description: "Stage inventory for quote requests, approvals, or multi-user checkout handoff."
  },
  account: {
    title: "Account",
    eyebrow: "Administration",
    description: "Manage company profile, roles, pricing visibility, and purchasing preferences."
  },
  itemDetail: {
    title: "Item detail",
    eyebrow: "Inventory detail",
    description: "Present complete product specs, media, provenance, and customer-specific commercial terms."
  }
} satisfies Record<string, RouteMeta>;
