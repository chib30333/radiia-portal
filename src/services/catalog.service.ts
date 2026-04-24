import type { InventoryCategory, InventoryItem } from "@/types/catalog";

const inventoryPreview: InventoryItem[] = [
  {
    id: "rd-1001",
    sku: "RAD-GEM-1001",
    title: "Ceylon Blue Sapphire",
    category: "gemstones",
    origin: "Sri Lanka",
    priceLabel: "Trade pricing pending auth",
    availability: "in-stock"
  },
  {
    id: "rd-2004",
    sku: "RAD-ND-2004",
    title: "Round Brilliant 1.20ct",
    category: "natural-diamonds",
    origin: "Botswana",
    priceLabel: "Contract pricing available",
    availability: "reserved"
  },
  {
    id: "rd-3108",
    sku: "RAD-LD-3108",
    title: "Oval 2.05ct F/VS1",
    category: "lab-diamonds",
    origin: "Factory batch B17",
    priceLabel: "Program pricing available",
    availability: "incoming"
  }
];

export async function getInventoryPreview(category?: InventoryCategory) {
  if (!category) {
    return inventoryPreview;
  }

  return inventoryPreview.filter((item) => item.category === category);
}
