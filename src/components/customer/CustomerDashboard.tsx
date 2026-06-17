import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/cn";
import type { CatalogItem, OrderStatus } from "@/types";

interface CustomerUser {
  userId: number;
  username: string;
  karmaScore: number;
  role: "customer";
}

interface DashboardOrder {
  orderId: number;
  skuCode: string;
  status: OrderStatus;
  isPickedUp: boolean;
  pickupCode: string | null;
  itemName: string;
  etaLabel: string;
}

interface CustomerDashboardProps {
  user: CustomerUser;
  catalogItems: CatalogItem[];
  orders: DashboardOrder[];
  onAddToCart?: (item: CatalogItem) => void;
  onClaimOrder?: (orderId: number) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatItemType(item: CatalogItem) {
  return "calorieCount" in item ? "Local Bento" : "Grab & Go";
}

export function CustomerDashboard({
  user,
  catalogItems,
  orders,
  onAddToCart,
  onClaimOrder,
}: CustomerDashboardProps) {
  const readyCount = orders.filter((order) => order.status === "READY").length;
  const pendingCount = orders.filter((order) => order.status === "PENDING").length;
  const totalValue = catalogItems.reduce(
    (sum, item) => sum + item.currentPrice,
    0
  );

  return (
    <section className="min-h-full bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/5 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.4)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Student Portal
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Hello, {user.username}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Karma
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-100">
                {user.karmaScore}
              </p>
            </div>
            <Button variant="secondary" size="md">
              View Wallet
            </Button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-orange-500 to-amber-400 p-5 text-slate-950">
                <p className="text-xs uppercase tracking-[0.3em]">Today&apos;s Picks</p>
                <p className="mt-3 text-3xl font-semibold">{catalogItems.length}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ready</p>
                <p className="mt-3 text-3xl font-semibold text-white">{readyCount}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pending</p>
                <p className="mt-3 text-3xl font-semibold text-white">{pendingCount}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Menu Highlights
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Fresh for today
                  </h2>
                </div>
                <Button variant="addToCart" size="sm">
                  Browse All
                </Button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {catalogItems.map((item) => (
                  <article
                    key={item.skuCode}
                    className="rounded-2xl border border-white/8 bg-slate-900/70 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          {formatItemType(item)}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {item.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-200">
                        {item.packagingType}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-semibold text-white">
                          {formatCurrency(item.currentPrice)}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {"calorieCount" in item
                            ? `${item.calorieCount} kcal`
                            : item.isRefrigerated
                              ? "Chilled"
                              : "Room temp"}
                        </p>
                      </div>
                      <Button variant="primary" size="sm">
                        Add to cart
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="xl:col-span-4">
            <div className="rounded-3xl border border-white/8 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Order Queue
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Your picks
                  </h2>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-sm text-slate-300">
                  {orders.length}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className={cn(
                      "rounded-2xl border p-4",
                      order.status === "READY"
                        ? "border-emerald-400/20 bg-emerald-500/10"
                        : "border-white/8 bg-slate-900/70"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {order.itemName}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {order.skuCode}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em]",
                          order.status === "READY"
                            ? "bg-emerald-400/15 text-emerald-100"
                            : "bg-amber-400/15 text-amber-100"
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                      <span>{order.etaLabel}</span>
                      {order.pickupCode ? (
                        <span className="font-mono">{order.pickupCode}</span>
                      ) : null}
                    </div>
                    {order.status === "READY" && !order.isPickedUp ? (
                      <Button variant="success" size="sm" className="mt-4 w-full">
                        Claim order
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Estimated total</span>
                  <span className="text-white">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
