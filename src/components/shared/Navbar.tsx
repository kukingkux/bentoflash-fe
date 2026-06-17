"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Oranienbaum } from "next/font/google";
import { cn } from "@/lib/cn";

const oranienbaum = Oranienbaum({
  subsets: ["latin"],
  weight: "400",
});

const navItems = ["Hot Offers", "For You", "Beverages", "Snacks"];

export default function Navbar() {
  const { user, session, setSessionData } = useUser();
  const router = useRouter();

  const handleMockLogin = async (roleToken: string) => {
    if (!roleToken) {
      setSessionData(null);
      router.push("/landing");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: roleToken }),
      });

      if (res.ok) {
        const data = await res.json();
        setSessionData(data);

        if (data.role === "KITCHEN_STAFF") router.push("/admin/kitchen/queue");
        else if (data.role === "SYSTEM_ADMIN") router.push("/admin/system/trigger");
        else router.push("/");
      }
    } catch (error) {
      console.error("API connection failed:", error);
    }
  };

  return (
    <nav className="flex justify-center px-4 py-4 lg:px-6">
      <div className="flex w-full max-w-7xl items-center justify-between rounded-full bg-[#fafafa] px-6 py-2 shadow-[0_4px_5.3px_rgba(0,0,0,0.05)]">
        <Link href={user ? "/" : "/landing"} className={cn(
          oranienbaum.className,
          "text-[32px] leading-none text-[#f45d0c]"
        )}>
          Kantina
        </Link>

        <div className="hidden items-center gap-6 text-sm text-[#1f1f1f] md:flex">
          {navItems.map((item) => (
            <span key={item} className="font-medium">
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user === "customer" && session && (
            <div className="hidden items-center gap-3 text-sm lg:flex">
              <span className="text-slate-500">Student: <strong className="text-slate-800">{session.username}</strong></span>
              <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-mono text-orange-500">
                Karma: {session.karmaScore}
              </span>
            </div>
          )}

          <select
            onChange={(e) => handleMockLogin(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
            value={user === "customer" ? "customer-token" : user === "kitchen_staff" ? "kitchen-token" : user === "admin" ? "admin-token" : ""}
          >
            <option value="">Log in</option>
            <option value="customer-token">Student (Customer)</option>
            <option value="kitchen-token">Kitchen Staff</option>
            <option value="admin-token">System Admin</option>
          </select>
        </div>
      </div>
    </nav>
  );
}