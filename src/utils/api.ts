// src/utils/api.ts
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

export interface CatalogItem {
  id: number;
  packagingType: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  skuCode: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isPerishable: boolean;
  discountApplied: boolean;
}

export interface MenuPayload {
  itemType: "BENTO" | "BEVERAGE";
  name: string;
  basePrice: number;
  skuCode: string;
  calorieCount?: number;
  isRefrigerated?: boolean;
}

export interface KitchenOrder {
  orderId: number;
  menuName: string;
  customerId: number;
  status: "PENDING" | "READY" | "DONE";
  pickupCode: string;
  orderTime: string;
  pickedUp: boolean;
  skuCode: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  karmaScore: number;
}

// Fetchers
export const api = {
  getUserProfile: async (userId: number): Promise<UserProfile> => {
    const res = await fetch(`${BASE_URL}/api/admin/system/users/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  },
  getCatalog: async (): Promise<CatalogItem[]> => {
    const res = await fetch(`${BASE_URL}/api/admin/menu`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch catalog");
    return res.json();
  },
  createMenu: async (payload: MenuPayload): Promise<CatalogItem> => {
    const res = await fetch(`${BASE_URL}/api/admin/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error ?? "Failed to create menu");
    }
    return res.json();
  },
  updateMenu: async (
    id: number,
    payload: MenuPayload,
  ): Promise<CatalogItem> => {
    const res = await fetch(`${BASE_URL}/api/admin/menu/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update menu");
    }
    return res.json();
  },

  deleteMenu: async (
    id: number,
  ): Promise<{ status: string; message: string }> => {
    const res = await fetch(`${BASE_URL}/api/admin/menu/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete menu");
    }
    return res.json();
  },
  reserveBento: async (payload: {
    userId: number;
    skuCode: string;
    quantity: number;
  }) => {
    const res = await fetch(`${BASE_URL}/api/bento-market/reserve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Reservation failed");
    return res.json();
  },
  getKitchenQueue: async (): Promise<KitchenOrder[]> => {
    const res = await fetch(`${BASE_URL}/api/admin/kitchen/queue/active`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch queue");
    return res.json();
  },
  triggerDiscount: async (): Promise<void> => {
    const res = await fetch(
      `${BASE_URL}/api/admin/system/cron/trigger-discount`,
      { method: "POST" },
    );
    if (!res.ok) throw new Error("Failed to trigger discount");
  },
  triggerResetDiscount: async (): Promise<void> => {
    const res = await fetch(
      `${BASE_URL}/api/admin/system/cron/reset-discount`,
      { method: "POST" },
    );
    if (!res.ok) throw new Error("failed to reset discount");
  },
  triggerGhostPenalty: async (userId: number): Promise<UserProfile> => {
    const res = await fetch(
      `${BASE_URL}/api/admin/system/users/${userId}/ghost`,
      { method: "PUT" },
    );
    if (!res.ok) throw new Error("Failed to process penalty");
    return res.json();
  },
};
