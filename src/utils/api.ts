export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  karmaScore: number;
}

export interface CatalogItem {
  id: number;
  itemType: string;
  itemName: string;
  basePrice: number;
  price: number;
  skuCode: string;
  calories: number;

  protein: number;
  carbs: number;
  fat: number;

  isPerishable: boolean;
  discountApplied: boolean;
}

export interface KitchenOrder {
  orderId: number;
  itemName: string;
  customerName: string;
  status: "PENDING" | "READY" | "DONE";
  pickupCode: string;
  orderTime: string;
}

export interface ReservePayload {
  userId: number;
  skuCode: string;
  quantity: number;
}

// API FETCH

export async function getCatalog(): Promise<CatalogItem[]> {
  const res = await fetch(`${BASE_URL}/api/bento-market/catalog`, {
    cache: "no-store", // Mencegah browser melakukan caching nilai harga lama
  });
  if (!res.ok) throw new Error("Gagal memuat katalog makanan.");
  return res.json();
}

export async function reserveBento(
  payload: ReservePayload,
): Promise<{ pickupCode: string }> {
  const res = await fetch(`${BASE_URL}/api/bento-market/reserve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal melakukan reservasi makanan.");
  return res.json();
}

export async function getKitchenQueue(): Promise<KitchenOrder[]> {
  const res = await fetch(`${BASE_URL}/api/admin/kitchen/queue/active`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal mengambil antrean aktif dapur.");
  return res.json();
}

export async function triggerFlashDiscount(): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/api/admin/system/cron/trigger-discount`,
    {
      method: "POST",
    },
  );
  if (!res.ok) throw new Error("Gagal memicu diskon sistem otomatis.");
}

export async function triggerGhostUserPenalti(
  userId: number,
): Promise<UserProfile> {
  const res = await fetch(
    `${BASE_URL}/api/admin/system/users/${userId}/ghost`,
    {
      method: "PUT",
    },
  );
  if (!res.ok)
    throw new Error("Gagal mengeksekusi penalti ketidakhadiran user.");
  return res.json();
}
