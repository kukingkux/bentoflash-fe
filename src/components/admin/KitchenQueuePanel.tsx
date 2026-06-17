import { Status, type StatusVariant } from "@/components/shared/Status";
import { cn } from "@/lib/cn";

export interface QueueItem {
  orderId: number;
  customerName: string;
  itemName: string;
  status: "PENDING" | "READY" | "CLAIMED";
  pickupCode: string;
  etaLabel: string;
}

interface KitchenQueuePanelProps {
  title?: string;
  items: QueueItem[];
}

const statusStyles: Record<QueueItem["status"], StatusVariant> = {
  PENDING: "PENDING",
  READY: "DONE",
  CLAIMED: "CANCELLED",
};

export function KitchenQueuePanel({
  title = "Queue",
  items,
}: KitchenQueuePanelProps) {
  return (
    <section className="flex flex-col items-start gap-4">
      <div className="">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Kitchen</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        </div>
        <Status variant="PENDING">{items.length}</Status>
      </div>
      <div className="mt-6 space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
        {items.map((item) => (
          <article
            key={item.orderId}
            className={cn(
              "rounded-2xl border p-4",
              item.status === "READY"
                ? "border-emerald-400/20 bg-emerald-500/10"
                : "border-white/8 bg-slate-900/70"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.itemName}</p>
                <p className="mt-1 text-xs text-slate-400">{item.customerName}</p>
              </div>
              <Status variant={statusStyles[item.status]}>{item.status}</Status>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
              <span>{item.etaLabel}</span>
              <span className="font-mono text-slate-100">{item.pickupCode}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
