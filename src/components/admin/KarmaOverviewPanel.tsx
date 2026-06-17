import { Badge } from "@/components/shared/Badge";

export interface KarmaRecord {
  user: string;
  score: number;
  trend: "up" | "down" | "stable";
  note: string;
}

interface KarmaOverviewPanelProps {
  records: KarmaRecord[];
}

export function KarmaOverviewPanel({ records }: KarmaOverviewPanelProps) {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/5 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.42)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Karma</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Behavior Audit</h2>
        </div>
        <Badge variant="info">{records.length} profiles</Badge>
      </div>
      <div className="mt-6 space-y-3">
        {records.map((record) => (
          <div key={record.user} className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-900/70 px-4 py-3">
            <div>
              <p className="font-medium text-white">{record.user}</p>
              <p className="mt-1 text-xs text-slate-400">{record.note}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-300">{record.score}</span>
              <Badge
                variant={
                  record.trend === "down"
                    ? "danger"
                    : record.trend === "up"
                      ? "success"
                      : "info"
                }
              >
                {record.trend}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
