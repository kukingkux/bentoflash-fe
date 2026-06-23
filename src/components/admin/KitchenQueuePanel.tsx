"use client";

import { Status, type StatusVariant } from "@/components/shared/Status";
import { useKarmaSystem, useKitchenQueue } from "@/hooks/useAdminLogic";
import { cn } from "@/lib/cn";
import type { KitchenOrder } from "@/utils/api";

interface KitchenQueuePanelProps {
  title?: string;
}

const statusStyles: Record<KitchenOrder["status"], StatusVariant> = {
  READY: "DONE",
  DONE: "DONE",
  PENDING: "PENDING",
};

const rowStyles: Record<KitchenOrder["status"], string> = {
  READY: "border-emerald-200 bg-emerald-50/80 text-text-primary",
  DONE: "border-emerald-100 bg-emerald-50/40 text-text-primary",
  PENDING: "border-transparent bg-transparent",
};

export function KitchenQueuePanel({ title = "Queue" }: KitchenQueuePanelProps) {
  const { queue, loading, fetchQueue } = useKitchenQueue();

  if (loading) {
    return (
      <section className="flex w-full flex-col gap-4 animate-pulse">
        <div className="flex w-full items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="h-8 w-48 rounded-md border border-border-subtle bg-surface-shell" />
            <div className="h-6 w-12 rounded-full border border-border-subtle bg-surface-shell" />
          </div>
          <div className="h-10 w-32 rounded-full border border-border-subtle bg-surface-shell" />
        </div>
        <div className="w-full h-148 space-y-3 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] px-8 py-6 shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
          <div className="h-10 w-full rounded-full border border-border-subtle bg-surface-panel" />
          <div className="h-8 w-full rounded-xl border border-border-subtle bg-surface-panel" />
          <div className="flex flex-col gap-3">
            <div className="h-16 w-full rounded-2xl border border-border-subtle bg-surface-card" />
            <div className="h-16 w-full rounded-2xl border border-border-subtle bg-surface-card" />
            <div className="h-16 w-full rounded-2xl border border-border-subtle bg-surface-card" />
            <div className="h-16 w-full rounded-2xl border border-border-subtle bg-surface-card" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          <div>
            <h2 className="mt-2 text-3xl font-semibold text-text-primary">
              {title}
            </h2>
          </div>
          <Status variant="PENDING">{queue.length}</Status>
        </div>
        <button
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-border-subtle bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-slate-50"
          onClick={fetchQueue}
          type="button"
        >
          Sync Queue
        </button>
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
            <p className="w-32">Pick up code</p>
            <p className="w-40">Order Time</p>
          </div>
          <div className="border border-border-subtle"></div>
          <div className="flex flex-col items-start gap-1 self-stretch">
            {queue.length === 0 ? (
              <div className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-white/70 px-6 text-center text-sm text-text-caption">
                Queue is empty right now.
              </div>
            ) : (
              queue.map((item) => <QueueRow key={item.orderId} item={item} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function QueueRow({ item }: { item: KitchenOrder }) {
  const { user, applyPenalty, isPenalizing, isUserLoading } = useKarmaSystem(
    item.customerId,
  );

  return (
    <div
      key={item.orderId}
      className={cn(
        "flex w-full flex-row justify-center items-center gap-2 self-stretch rounded-2xl px-2 py-3 text-text-caption transition-colors",
        rowStyles[item.status],
      )}
    >
      <div className="w-4 h-4 bg-surface-shell border rounded-sm border-border-subtle"></div>
      <div className="flex flex-col items-start w-6">
        <p>{item.orderId}</p>
      </div>
      <div className="flex w-56 flex-col items-start justify-center gap-3 self-stretch">
        <p>{item.menuName}</p>
      </div>
      <div className="flex w-28 justify-center items-center gap-4">
        <Status variant={statusStyles[item.status]}>{item.status}</Status>
      </div>
      <div className="flex w-28 items-center self-stretch">
        {item.status === "DONE" ? "TRUE" : "FALSE"}
      </div>
      <div className="flex flex-1 justify-start items-start">
        <p>
          {isUserLoading
            ? "Loading..."
            : user?.name || `User #${item.customerId}`}
        </p>
      </div>
      <div className="flex items-center w-30">
        <p>{item.pickupCode}</p>
      </div>
      <div className="flex w-38 justify-start items-center">
        <p>{item.orderTime}</p>
      </div>
    </div>
  );
}
