import { KarmaOverviewPanel } from "@/components/admin/KarmaOverviewPanel";

const karmaRecords = [
  {
    user: "Ari",
    score: 98,
    trend: "up" as const,
    note: "Frequent pickup and low waste",
  },
  {
    user: "Dina",
    score: 72,
    trend: "stable" as const,
    note: "Balanced ordering behavior",
  },
  {
    user: "Raka",
    score: 46,
    trend: "down" as const,
    note: "Needs follow-up on punctuality",
  },
];

export default function KarmaPage() {
  return (
    <div className="space-y-6">
      <KarmaOverviewPanel records={karmaRecords} />
    </div>
  );
}
