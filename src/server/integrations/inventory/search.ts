import type { InventoryCategory } from "@/types/catalog";

export async function searchInventory(category: InventoryCategory, query?: string) {
  return {
    category,
    query: query ?? "",
    results: [],
    note: "Server-side inventory search integration placeholder"
  };
}
