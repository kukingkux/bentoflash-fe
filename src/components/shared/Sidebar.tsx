import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { Badge } from "./Badge";

type SidebarRoute =
  | "/admin/kitchen/queue"
  | "/admin/kitchen/stock"
  | "/admin/system/trigger"
  | "/admin/system/karma";

type SidebarCountMap = Partial<Record<SidebarRoute, number>>;

interface SidebarItem {
  label: string;
  route: SidebarRoute;
  icon: string;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  activeRoute: string;
  counts?: SidebarCountMap;
  title?: string;
  backLabel?: string;
  onBack?: () => void;
  onRouteChange?: (route: SidebarRoute) => void;
}

const sections: Array<{ title: string; items: SidebarItem[] }> = [
  {
    title: "Kitchen",
    items: [
      {
        label: "Queue",
        route: "/admin/kitchen/queue",
        icon: "dashboard_2",
      },
      {
        label: "Stock",
        route: "/admin/kitchen/stock",
        icon: "inventory_2",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Time Trigger",
        route: "/admin/system/trigger",
        icon: "schedule",
      },
      {
        label: "Karma",
        route: "/admin/system/karma",
        icon: "workspace_premium",
      },
    ],
  },
];

function isActiveRoute(activeRoute: string, route: SidebarRoute) {
  return activeRoute === route || activeRoute.startsWith(`${route}/`);
}

export function Sidebar({
  className,
  activeRoute,
  counts,
  title = "ADMIN",
  backLabel = "Back to User View",
  onBack,
  onRouteChange,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 flex h-screen w-[19rem] flex-col border-r border-white/6 bg-[#101215] px-7 py-8 text-slate-100 shadow-[24px_0_64px_rgba(0,0,0,0.38)]",
        className
      )}
      {...props}
    >
      <button
        className="inline-flex w-fit items-center gap-2 text-sm text-slate-400 transition hover:text-slate-100"
        type="button"
        onClick={onBack}
      >
        <span aria-hidden="true" className="icon-light text-base">
          chevron_left
        </span>
        <span>{backLabel}</span>
      </button>

      <div className="mt-7 flex items-center justify-between">
        <span className="text-[2.3rem] leading-none font-light tracking-[0.32em] text-white">
          {title}
        </span>
      </div>

      <nav className="mt-12 flex flex-1 flex-col gap-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-[0.02em] text-slate-100">
                {section.title}
              </h2>
              <span aria-hidden="true" className="icon-light text-lg text-slate-500">
                expand_more
              </span>
            </div>

            <div className="space-y-2">
              {section.items.map((item) => {
                const active = isActiveRoute(activeRoute, item.route);
                const count = counts?.[item.route];

                return (
                  <button
                    key={item.route}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                      active
                        ? "bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "text-slate-400 hover:bg-white/4 hover:text-slate-100"
                    )}
                    type="button"
                    onClick={() => onRouteChange?.(item.route)}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "icon-light text-[1.2rem]",
                        active ? "text-orange-300" : "text-slate-500 group-hover:text-slate-200"
                      )}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1 text-[0.97rem] font-medium">
                      {item.label}
                    </span>

                    {typeof count === "number" && count > 0 ? (
                      <Badge
                        aria-label={`${count} pending`}
                        className="min-h-6 min-w-6 border-0 bg-red-500 px-2 py-0 text-[10px] tracking-normal text-white shadow-none"
                        variant="danger"
                      >
                        {count}
                      </Badge>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
