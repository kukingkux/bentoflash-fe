"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

interface NavItem {
  name: string;
  href: string;
  badge?: number;
  icon: "queue" | "menu" | "trigger" | "karma";
}

interface GroupedNav {
  sectionTitle: string;
  items: NavItem[];
}

function Icon({ type, active }: { type: NavItem["icon"]; active: boolean }) {
  const color = active ? "#1f1f1f" : "#8e8e93";

  switch (type) {
    case "queue":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3.75 4.5H14.25V13.5H3.75V4.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 7.5H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 10.5H9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "menu":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M4 5H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 9H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 13H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "trigger":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 3V9L12 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="6" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "karma":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 2.5L11.2 6.3L15.5 7L12.5 10L13.2 14.3L9 12.1L4.8 14.3L5.5 10L2.5 7L6.8 6.3L9 2.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function AdminNavLinks() {
  const pathname = usePathname();

  const navigationStructure: GroupedNav[] = [
    {
      sectionTitle: "Kitchen",
      items: [
        { name: "Queue", href: "/admin/kitchen/queue", icon: "queue" },
        {
          name: "Menu",
          href: "/admin/kitchen/menu",
          icon: "menu",
          badge: 4,
        },
      ],
    },
    {
      sectionTitle: "System",
      items: [
        { name: "Time Trigger", href: "/admin/system/trigger", icon: "trigger" },
        { name: "Karma", href: "/admin/system/karma", icon: "karma" },
      ],
    },
  ];

  return (
    <nav className="space-y-8">
      {navigationStructure.map((group) => (
        <div key={group.sectionTitle} className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[14px] font-bold text-[#131313]">{group.sectionTitle}</h3>
            <span className="flex h-6 w-6 items-center justify-center text-[#8e8e93]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <ul className="space-y-2">
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                      isActive
                        ? "bg-[#f5f5f5] text-[#1f1f1f]"
                        : "text-[#8e8e93] hover:bg-[#f5f5f5] hover:text-[#1f1f1f]"
                    )}
                  >
                    <span className="flex h-[18px] w-[18px] items-center justify-center">
                      <Icon type={item.icon} active={isActive} />
                    </span>
                    <span className={cn(
                      "text-[14px] font-medium",
                      isActive ? "font-semibold" : "font-medium"
                    )}>
                      {item.name}
                    </span>
                    {item.badge ? (
                      <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#f45d0c] px-1 text-[11px] font-semibold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}