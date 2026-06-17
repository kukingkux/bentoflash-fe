import { Badge } from "@/components/shared/Badge";

export interface MenuCatalogItem {
  skuCode: string;
  name: string;
  category: string;
  price: number;
  availability: "Available" | "Limited" | "Sold out";
}

interface MenuCatalogPanelProps {
  items: MenuCatalogItem[];
}

export function MenuCatalogPanel({ items }: MenuCatalogPanelProps) {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/5 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.42)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Menu</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Catalog Overview</h2>
        </div>
        <Badge variant="info">{items.length} dishes</Badge>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.skuCode} className="rounded-2xl border border-white/8 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-1 text-xs text-slate-400">{item.category}</p>
              </div>
              <Badge
                variant={
                  item.availability === "Sold out"
                    ? "danger"
                    : item.availability === "Limited"
                      ? "warning"
                      : "success"
                }
              >
                {item.availability}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-300">{item.skuCode}</p>
            <p className="mt-2 text-lg font-semibold text-white">Rp {item.price.toLocaleString("id-ID")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
