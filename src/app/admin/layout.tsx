import React from "react";
import Link from "next/link";

import AdminNavLinks from "@/components/admin/AdminNavLinks";

export const metadata = {
  title: "Halaman Atmin Loh Yah - Bento Flash",
  description: "Internal Operational Control Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f1f1f1] text-[#1f1f1f]">
      <div className="flex min-h-[calc(100vh-65px)]">
        <aside className="relative flex w-[360px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f1f1f1] px-6 pb-8 pt-7">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-[14px] text-[#5f5f5f]"
          >
            <span className="flex h-6 w-6 rotate-180 items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Back to User View</span>
          </Link>

          <h2 className="mt-6 text-[40px] leading-none text-[#1f1f1f]" style={{ fontFamily: "Oranienbaum, serif" }}>
            ATMIN
          </h2>

          <div className="mt-7 flex-1 overflow-y-auto">
            <AdminNavLinks />
          </div>
        </aside>

        <section className="flex-1 overflow-y-auto bg-[#f7f7f7] p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </section>
      </div>
    </div>
  );
}