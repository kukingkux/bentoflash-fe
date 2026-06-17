import { CustomerDashboard } from "@/components/customer/CustomerDashboard";
import type { CatalogItem } from "@/types";

const catalogItems: CatalogItem[] = [
  {
    skuCode: "TT-BNTO-RENDANG-01",
    name: "Nasi Padang Rendang",
    basePrice: 22000,
    currentPrice: 22000,
    packagingType: "Box",
    calorieCount: 545,
  },
  {
    skuCode: "TT-BVG-ESTEH-02",
    name: "Es Teh Manis",
    basePrice: 5000,
    currentPrice: 5000,
    packagingType: "Bottle",
    isRefrigerated: true,
  },
];

const orders = [
  {
    orderId: 1001,
    skuCode: "TT-BNTO-RENDANG-01",
    status: "PENDING" as const,
    isPickedUp: false,
    pickupCode: "PICK-1001",
    itemName: "Nasi Padang Rendang",
    etaLabel: "Ready in 5 min",
  },
  {
    orderId: 1002,
    skuCode: "TT-BVG-ESTEH-02",
    status: "READY" as const,
    isPickedUp: false,
    pickupCode: "PICK-1002",
    itemName: "Es Teh Manis",
    etaLabel: "Pickup now",
  },
];

export default function HomePage() {
  return (
    <CustomerDashboard
      user={{
        userId: 42,
        username: "Ari",
        karmaScore: 98,
        role: "customer",
      }}
      catalogItems={catalogItems}
      orders={orders}
    />
  );
}
