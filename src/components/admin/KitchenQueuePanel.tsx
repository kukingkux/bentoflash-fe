import { Status, type StatusVariant } from "@/components/shared/Status";
import { cn } from "@/lib/cn";

export interface QueueItem {
  orderId: string;
  customerName: string;
  itemName: string;
  status: "DONE" | "READY" | "PENDING" | "CANCELLED";
  pickupCode: string;
  orderTime: string;
  etaLabel: string;
}

interface KitchenQueuePanelProps {
  title?: string;
  items: QueueItem[];
}

const statusStyles: Record<QueueItem["status"], StatusVariant> = {
    READY: "DONE",
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
};

export function KitchenQueuePanel({
  title = "Queue",
  items,
}: KitchenQueuePanelProps) {
  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex items-end gap-4">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">{title}</h2>
        </div>
        <Status variant="PENDING">{items.length}</Status>
      </div>
      <div className="w-full h-148 mt-6 space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
        <div className="flex w-full justify-between gap-auto">
            <div className="flex w-56 flex-start border rounded-full border-border-subtle">
                <div className="flex flex-1 py-1 justify-center items-center bg-text-primary text-white rounded-full">
                    <p>All</p>
                </div>
                <div className="flex flex-1 py-1 justify-center items-center rounded-full text-text-caption">
                    <p>Active</p>
                </div>
            </div>
            <div className="flex w-48 px-2 gap-1 justify-start items-center border border-border-subtle rounded-full text-text-caption">
                <span className="material-symbols-outlined">search</span>
                <p>Find items...</p>
            </div>
        </div>
        <div className="flex w-full flex-col gap-1 flex-1 self-start">
            <div className="flex justify-center items-start gap-2 self-stretch font-semibold">
                <p className="w-14">Order ID</p>
                <p className="w-56">Menu</p>
                <p className="w-28">Status</p>
                <p className="w-28">Picked up?</p>
                <p className="flex-1">Customer</p>
                <p className="">Pick up code</p>
                <p className="w-28">Order Time</p>
            </div>
            <div className="border border-border-subtle"></div>
            <div className="flex flex-col items-start gap-1 self-stretch">
                {items.map((item) => (
                    <div 
                    key={item.orderId}
                    className="flex w-full flex-row justify-center items-center gap-2 self-stretch text-text-caption">
                    
                        <div className="w-4 h-4 bg-surface-shell border rounded-sm border-border-subtle"></div>
                        <div className="flex flex-col gap-4 items-start w-8">
                            <p>{item.orderId}</p>
                        </div>
                        <div className="flex w-56 flex-col gap-4 items-start justify-center gap-3 self-stretch">
                            <p>{item.itemName}</p>
                        </div>
                        <div className="flex w-28 justify-center items-center gap-4">
                            <Status variant={statusStyles[item.status] || item.status}>{item.status}</Status>
                        </div>
                        <div className="flex w-28 items-start gap-2 self-stretch">
                            {item.status === "DONE" ? "TRUE" : "FALSE"}
                        </div>
                        <div className="flex flex-1 justify-start items-start gap-3">
                            <p>{item.customerName}</p>
                        </div>
                        <div className="flex justify-center items-center gap-4 w-24">
                            <p>{item.pickupCode}</p>
                        </div>
                        <div className="flex w-28 justify-start items-center gap-4">
                            <p>{item.orderTime || item.etaLabel}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
