"use client";
import { MenuCatalogPanel } from "@/components/admin/MenuCatalogPanel";
import { Status } from "@/components/shared/Status";

export default function KitchenMenuPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Status examples
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Status variant="DONE" />
          <Status variant="PENDING" />
          <Status variant="CANCELLED" />
        </div>
      </section>
      <MenuCatalogPanel />
    </div>
  );
}
