import { Heart, History, Search, UserRound } from "lucide-react";

export const historyItems = [
  {
    id: "REQ-1048",
    type: "Memo Request",
    createdAt: "April 9, 2026",
    status: "In review",
    total: "$17,451",
    items: 2
  },
  {
    id: "REQ-1041",
    type: "Invoice Request",
    createdAt: "April 5, 2026",
    status: "Submitted",
    total: "$6,358",
    items: 1
  },
  {
    id: "REQ-1036",
    type: "Memo Request",
    createdAt: "March 29, 2026",
    status: "Completed",
    total: "$9,486",
    items: 1
  }
] as const;

export const accountSections = [
  {
    label: "Profile",
    href: "/account",
    icon: UserRound
  },
  {
    label: "Order history",
    href: "/order-history",
    icon: History
  },
  {
    label: "Saved searches",
    href: "/saved-searches",
    icon: Search
  },
  {
    label: "Favorites",
    href: "/favorites",
    icon: Heart
  }
] as const;

export const searches = [
  {
    id: "1",
    category: "Natural Diamonds",
    name: "Top-tier rounds for client Margot",
    savedAt: "Saved Thursday, April 3, 2026 at 2:14 PM",
    params: [
      ["Shape", "Round"],
      ["Carat", "1.00 – 2.00"],
      ["Color", "D, E, F"],
      ["Clarity", "VVS1, VVS2, VS1"],
      ["Cut", "Excellent"],
      ["Lab", "GIA"],
      ["Results", "566 stones"]
    ]
  },
  {
    id: "2",
    category: "Gemstones",
    name: "Ceylon blue sapphires 2–4ct",
    savedAt: "Saved Wednesday, April 2, 2026 at 10:41 AM",
    params: [
      ["Type", "Sapphire"],
      ["Shape", "Cushion"],
      ["Color", "Blue"],
      ["Carat", "2.00 – 4.00"],
      ["Certification", "Certified"],
      ["Results", "142 stones"]
    ]
  },
  {
    id: "3",
    category: "Lab Diamonds",
    name: "Budget ovals under $3k IGI",
    savedAt: "Saved Monday, March 31, 2026 at 4:07 PM",
    params: [
      ["Shape", "Oval"],
      ["Price", "Under $3,000"],
      ["Lab", "IGI"],
      ["Carat", "0.75 – 1.25"],
      ["Color", "F, G, H"],
      ["Results", "218 stones"]
    ]
  }
] as const;