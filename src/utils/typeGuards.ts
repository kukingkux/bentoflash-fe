import { CatalogItem, LocalCultureBento, GrabAndGoBeverage } from "@/types";

/**
 * Type guard to check if a catalog item is a LocalCultureBento
 */
export function isBentoItem(item: CatalogItem): item is LocalCultureBento {
  return item !== undefined && "calorieCount" in item;
}

/**
 * Type guard to check if a catalog item is a GrabAndGoBeverage
 */
export function isBeverageItem(item: CatalogItem): item is GrabAndGoBeverage {
  return item !== undefined && "isRefrigerated" in item;
}