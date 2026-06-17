import { StockInventoryPanel } from "@/components/admin/StockInventoryPanel";

const inventoryItems = [
  {
    skuCode: "TT-BNTO-RENDANG-01",
    name: "Nasi Padang Rendang",
    quantity: 18,
    unit: "servings",
    status: "In stock" as const,
  },
  {
    skuCode: "TT-BVG-ESTEH-02",
    name: "Es Teh Manis",
    quantity: 4,
    unit: "bottles",
    status: "Low stock" as const,
  },
  {
    skuCode: "TT-MIX-AYAM-03",
    name: "Paket Ayam",
    quantity: 0,
    unit: "servings",
    status: "Out of stock" as const,
  },
];

export default function KitchenStockPage() {
  return (
    <div className="space-y-6">
      <StockInventoryPanel items={inventoryItems} />
    </div>
  );
}
