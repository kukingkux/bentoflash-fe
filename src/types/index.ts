export interface CatalogItem {
  name: string;
  basePrice: number;
  skuCode: string;
  currentPrice: number;
}

export interface LocalCultureBento extends CatalogItem {
  calorieCount: number;
  ingredients: string[];
}

export interface GrabAndGoBeverage extends CatalogItem {
  isRefrigerated: boolean;
}

export type OrderStatus = "PENDING" | "READY" | "CLAIMED" | "GHOSTED";

export interface Order {
  orderId: string;
  pickupCode: string;
  isPickedUp: boolean;
  status: OrderStatus;
  items: CatalogItem[];
  orderTime: string;
}

export interface User {
  userId: string;
  username: string;
  karmaScore: number;
  role: "CUSTOMER" | "KITCHEN_STAFF" | "SYSTEM_ADMIN";
}
