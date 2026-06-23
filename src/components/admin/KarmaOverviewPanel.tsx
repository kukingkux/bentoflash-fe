"use client";

import { Badge } from "@/components/shared/Badge";
import { Status } from "@/components/shared/Status";
import { useUsers } from "@/hooks/useAdminLogic";

export function KarmaOverviewPanel() {
  const { users, loading } = useUsers();

  return (
    <section className="flex flex-col items-start gap-4">
      <div className="flex items-end gap-4">
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-text-primary">
            Behavior Audit
          </h2>
        </div>
        <Status variant="PENDING">{users.length} Profiles</Status>
      </div>
      
      <div className="w-full min-h-148 mt-6 space-y-3 flex flex-col items-start gap-4 px-8 py-6 rounded-3xl border border-[#E0E0E0] bg-[#FAFAFA] shadow-[0_3px_4.3px_rgba(0,0,0,0.02)] backdrop-blur-xl">
        <div className="flex w-full flex-col gap-1 flex-1 self-start">
          <div className="flex justify-center items-start gap-2 self-stretch font-semibold text-text-primary">
            <p className="w-56">User Profile</p>
            <p className="flex-1">Status</p>
            <p className="w-24">Score</p>
            <p className="w-28 text-center">Trend</p>
          </div>
          <div className="border border-border-subtle my-2"></div>
          <div className="flex flex-col items-start gap-2 self-stretch mt-1">
            {loading ? (
              <div className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-white/70 px-6 text-center text-sm text-text-caption">
                Loading profiles...
              </div>
            ) : users.length === 0 ? (
              <div className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-white/70 px-6 text-center text-sm text-text-caption">
                No profiles audited yet.
              </div>
            ) : (
              users.map((user) => {
                const trend = user.karmaScore >= 100 ? "up" : user.karmaScore < 50 ? "down" : "stable";
                return (
                  <article key={user.userId} className="flex w-full flex-row justify-center items-center gap-2 self-stretch text-text-caption py-1">
                    <div className="flex flex-col items-start w-56 font-medium text-text-primary">
                      <p>{user.name}</p>
                      <p className="text-xs text-text-muted font-normal mt-0.5">{user.email}</p>
                    </div>
                    <div className="flex flex-1 flex-col items-start justify-center">
                      <p className="text-sm">{user.loyaltyStatus}</p>
                    </div>
                    <div className="flex w-24 justify-start items-center">
                      <p className="text-sm font-semibold">{user.karmaScore}</p>
                    </div>
                    <div className="flex justify-center items-center w-28">
                      <Badge
                        variant={
                          trend === "down"
                            ? "danger"
                            : trend === "up"
                              ? "success"
                              : "info"
                        }
                      >
                        {trend}
                      </Badge>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
