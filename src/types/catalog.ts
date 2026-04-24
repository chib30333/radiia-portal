export type InventoryCategory =
  | "gemstones"
  | "natural-diamonds"
  | "lab-diamonds";

export type InventoryItem = {
  id: string;
  sku: string;
  title: string;
  category: InventoryCategory;
  origin: string;
  priceLabel: string;
  availability: "in-stock" | "reserved" | "incoming";
};
