import type { Route } from "next";

export type HeaderTab = "natural" | "lab" | "gemstones";
export type HeaderAccountIconKey =
  | "user"
  | "lock"
  | "history"
  | "list"
  | "heart"
  | "logout";

export const headerLinks = [
  { key: "natural", label: "Natural Diamonds", href: "/natural-diamonds" },
  { key: "lab", label: "Lab Diamonds", href: "/lab-diamonds" },
  { key: "gemstones", label: "Gemstones", href: "/gemstones" }
] as const satisfies ReadonlyArray<{ key: HeaderTab; label: string; href: Route }>;

export const accountMenuItems = [
  { label: "My account", icon: "user", href: "/account", danger: false },
  { label: "Change password", icon: "lock", href: "/reset-password", danger: false },
  { label: "Order history", icon: "history", href: "/order-history", danger: false },
  { label: "Saved searches", icon: "list", href: "/saved-searches", danger: false },
  { label: "Favorites", icon: "heart", href: "/favorites", danger: false },
  { label: "Log out", icon: "logout", href: "/login", danger: true }
] as const satisfies ReadonlyArray<{
  label: string;
  icon: HeaderAccountIconKey;
  href: Route;
  danger?: boolean;
}>;

export const landingCards = [
  { title: "Natural Diamonds", href: "/natural-diamonds", kind: "natural" },
  { title: "Gemstones", href: "/gemstones", kind: "gemstones" },
  { title: "Lab Diamonds", href: "/lab-diamonds", kind: "lab" }
] as const satisfies ReadonlyArray<{
  title: string;
  href: Route;
  kind: "natural" | "lab" | "gemstones";
}>;

export const gemstoneTypes = [
  { label: "Sapphire", swatchClass: "swatch-sapphire", selected: true },
  { label: "Ruby", swatchClass: "swatch-ruby", selected: false },
  { label: "Emerald", swatchClass: "swatch-emerald", selected: false },
  { label: "Spinel", swatchClass: "swatch-spinel", selected: false },
  { label: "Other", swatchClass: "swatch-other", selected: false }
] as const;

export const gemstoneShapes = [
  { label: "Round", selected: true },
  { label: "Oval", selected: false },
  { label: "Cushion", selected: false },
  { label: "Emerald", selected: false }
] as const;

export const gemstoneColorOptions = [
  { label: "Blue", swatchClass: "swatch-blue", selected: true },
  { label: "Pink", swatchClass: "swatch-pink", selected: false },
  { label: "Red", swatchClass: "swatch-red", selected: false },
  { label: "Green", swatchClass: "swatch-green", selected: false },
  { label: "Purple", swatchClass: "swatch-purple", selected: false },
  { label: "Other", swatchClass: "swatch-other", selected: false }
] as const;

export const naturalShapes = [
  { label: "Round", selected: true },
  { label: "Oval", selected: false },
  { label: "Princess", selected: false },
  { label: "Emerald", selected: false },
  { label: "Cushion", selected: false },
  { label: "Radiant", selected: false },
  { label: "Pear", selected: false },
  { label: "Marquise", selected: false }
] as const;

export const resultGridCards = [
  {
    id: "BR026301",
    title: "1.01ct D VVS1",
    type: "Natural",
    shape: "Round",
    price: "$2,841",
    meta: "GIA - Exc/Exc/VG",
    favored: false,
    toneClass: "inventory-tone-stone",
    video: false
  },
  {
    id: "BR022426",
    title: "1.11ct E VVS2",
    type: "Natural",
    shape: "Round",
    price: "$3,105",
    meta: "GIA - Exc/Exc/Exc",
    favored: true,
    toneClass: "inventory-tone-blue",
    video: false
  },
  {
    id: "BR035830",
    title: "1.01ct D VS1",
    type: "Natural",
    shape: "Oval",
    price: "$2,640",
    meta: "GIA - Exc/Exc/Exc",
    favored: false,
    toneClass: "inventory-tone-stone",
    video: true
  },
  {
    id: "BR037812B",
    title: "1.05ct D VVS2",
    type: "Natural",
    shape: "Cushion",
    price: "$2,980",
    meta: "GIA - Exc/Exc/Exc",
    favored: false,
    toneClass: "inventory-tone-stone",
    video: false
  }
] as const;

export const resultFilterChips = [
  "Round",
  "D - E",
  "VVS1 - VVS2",
  "1.00 - 2.00 ct",
  "GIA"
] as string[];

export const resultRows = [
  {
    id: "BR026301",
    type: "Natural",
    shape: "Round",
    carat: 1.01,
    color: "D",
    clarity: "VVS1",
    ratio: 1,
    ppc: 2812,
    total: 2841,
    lab: "GIA",
    cert: "185503",
    favored: false,
    video: false,
    available: true
  },
  {
    id: "BR022426",
    type: "Natural",
    shape: "Round",
    carat: 1.11,
    color: "E",
    clarity: "VVS2",
    ratio: 1,
    ppc: 2797,
    total: 3105,
    lab: "GIA",
    cert: "-",
    favored: true,
    video: true,
    available: true
  },
  {
    id: "BR035830",
    type: "Natural",
    shape: "Round",
    carat: 1.01,
    color: "D",
    clarity: "VS1",
    ratio: 1.01,
    ppc: 2614,
    total: 2640,
    lab: "GIA",
    cert: "185502",
    favored: false,
    video: true,
    available: false
  },
  {
    id: "BR036685",
    type: "Natural",
    shape: "Round",
    carat: 1,
    color: "E",
    clarity: "VVS1",
    ratio: 1,
    ppc: 3320,
    total: 3320,
    lab: "IGI",
    cert: "-",
    favored: false,
    video: false,
    available: true
  },
  {
    id: "BR041112",
    type: "Natural",
    shape: "Oval",
    carat: 1.27,
    color: "F",
    clarity: "VS2",
    ratio: 1.32,
    ppc: 3480,
    total: 4419,
    lab: "GIA",
    cert: "188321",
    favored: true,
    video: true,
    available: true
  },
  {
    id: "BR041245",
    type: "Natural",
    shape: "Cushion",
    carat: 1.52,
    color: "G",
    clarity: "SI1",
    ratio: 1.08,
    ppc: 2910,
    total: 4423,
    lab: "GIA",
    cert: "186908",
    favored: false,
    video: false,
    available: true
  }
] as const;

export const detailRows = {
  diamond: [
    ["Shape", "Round"],
    ["Carat", "1.01"],
    ["Color", "F"],
    ["Clarity", "I1"],
    ["Cut", "Excellent"],
    ["Polish", "Excellent"],
    ["Symmetry", "Very Good"],
    ["Fluorescence", "Medium"],
    ["Measurements", "6.39 x 6.44 x 4.01"],
    ["Ratio", "0.99"],
    ["Depth %", "62.5%"],
    ["Table %", "57%"],
    ["Lab", "GIA"],
    ["Cert #", "185503"]
  ],
  gemstone: [
    ["Type", "Sapphire"],
    ["Shape", "Cushion"],
    ["Carat", "2.89"],
    ["Color", "Blue"],
    ["Origin", "Ceylon"],
    ["Treatment", "Heat"],
    ["Measurements", "8.12 x 7.84 x 5.20"],
    ["Ratio", "1.04"],
    ["Lab", "GIA"],
    ["Cert #", "185503"]
  ]
} as const;

export const cartItems = [
  {
    id: "S15382-3",
    subtitle: "Sapphire - Cushion - 3.54ct - Blue",
    total: "$7,965",
    perCarat: "$2,250 / ct",
    selected: true,
    toneClass: "gem-tone-a"
  },
  {
    id: "S15571C-03",
    subtitle: "Sapphire - Cushion - 3.25ct - Blue",
    total: "$4,713",
    perCarat: "$1,450 / ct",
    selected: false,
    toneClass: "gem-tone-b"
  },
  {
    id: "S15380-06",
    subtitle: "Sapphire - Cushion - 3.11ct - Blue",
    total: "$9,486",
    perCarat: "$3,050 / ct",
    selected: true,
    toneClass: "gem-tone-c"
  }
] as const;
