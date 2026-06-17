// Role Mapping Types
export type BackendRole = "CUSTOMER" | "KITCHEN_STAFF" | "SYSTEM_ADMIN";
export type UserRole = "customer" | "kitchen_staff" | "admin" | null;

export interface UserSession {
  userId: number;
  username: string;
  role: UserRole;
  karmaScore: number;
}

// Polymorphic Catalog Items
export interface BaseCatalogItem {
  skuCode: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  packagingType: string;
}

export interface LocalCultureBento extends BaseCatalogItem {
  calorieCount: number;
}

export interface GrabAndGoBeverage extends BaseCatalogItem {
  isRefrigerated: boolean;
}

export type CatalogItem = LocalCultureBento | GrabAndGoBeverage;

// Order and Queue structures
export type OrderStatus = "PENDING" | "READY" | "CLAIMED" | "GHOSTED";

export interface OrderResponse {
  orderId: number;
  skuCode: string;
  status: OrderStatus;
  isPickedUp: boolean;
  pickupCode: string | null;
}