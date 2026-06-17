import { Badge } from "@/components/shared/Badge";

export interface InventoryItem {
  skuCode: string;
  name: string;
  quantity: number;
  unit: string;
  status: "In stock" | "Low stock" | "Out of stock";
}

interface StockInventoryPanelProps {
  items: InventoryItem[];
}

export function StockInventoryPanel({ items }: StockInventoryPanelProps) {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/5 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.42)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Inventory</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Stock Management</h2>
        </div>
        <Badge variant="info">{items.length} SKUs</Badge>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.skuCode} className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-900/70 px-4 py-3">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="mt-1 text-xs text-slate-400">{item.skuCode}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300">
                {item.quantity} {item.unit}
              </span>
              <Badge
                variant={
                  item.status === "Out of stock"
                    ? "danger"
                    : item.status === "Low stock"
                      ? "warning"
                      : "success"
                }
              >
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
