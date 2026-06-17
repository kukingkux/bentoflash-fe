import { KitchenQueuePanel } from "@/components/admin/KitchenQueuePanel";

const queueItems = [
  {
    orderId: 1001,
    customerName: "Ari",
    itemName: "Nasi Padang Rendang",
    status: "PENDING" as const,
    pickupCode: "PICK-1001",
    etaLabel: "Ready in 5 min",
  },
  {
    orderId: 1002,
    customerName: "Lia",
    itemName: "Es Teh Manis",
    status: "READY" as const,
    pickupCode: "PICK-1002",
    etaLabel: "Pickup now",
  },
  {
    orderId: 1003,
    customerName: "Dina",
    itemName: "Paket Ayam",
    status: "CLAIMED" as const,
    pickupCode: "PICK-1003",
    etaLabel: "Collected",
  },
];

export default function KitchenQueuePage() {
  return (
    <div className="space-y-6">
      <KitchenQueuePanel items={queueItems} />
    </div>
  );
}
