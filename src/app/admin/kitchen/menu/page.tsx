import { MenuCatalogPanel } from "@/components/admin/MenuCatalogPanel";
import { Status } from "@/components/shared/Status";

const menuItems = [
  {
    menuId: "DC-001",
    skuCode: "TT-BNTO-RENDANG-01",
    name: "Nasi Padang Rendang",
    category: "Main Course",
    price: 22000,
    availability: "Available" as const,
  },
  {
    menuId: "DC-001",
    skuCode: "TT-BVG-ESTEH-02",
    name: "Es Teh Manis",
    category: "Beverage",
    price: 5000,
    availability: "Limited" as const,
  },
  {
    menuId: "DC-001",
    skuCode: "TT-MIX-AYAM-03",
    name: "Paket Ayam",
    category: "Combo",
    price: 30000,
    availability: "Sold out" as const,
  },
];

export default function KitchenMenuPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Status examples</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Status variant="DONE" />
          <Status variant="PENDING" />
          <Status variant="CANCELLED" />
        </div>
      </section>
      <MenuCatalogPanel items={menuItems} />
    </div>
  );
}
