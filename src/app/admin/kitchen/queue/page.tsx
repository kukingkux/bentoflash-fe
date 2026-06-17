import { KitchenQueuePanel } from "@/components/admin/KitchenQueuePanel";

const queueItems = [
  {
    orderId: 1001,
    customerName: "Ari",
    itemName: "Nasi Padang Rendang",
    status: "PENDING" as const,
    pickupCode: "PICK-1001",
    etaLabel: "Ready in 5 min",
    orderTime: "May 13, 09:32:10"
  },
  {
    orderId: 1002,
    customerName: "Lia",
    itemName: "Es Teh Manis",
    status: "READY" as const,
    pickupCode: "PICK-1002",
    etaLabel: "Pickup now",
    orderTime: "May 13, 09:32:10"
  },
  {
    orderId: 1003,
    customerName: "Dina",
    itemName: "Paket Ayam",
    status: "CANCELLED" as const,
    pickupCode: "PICK-1003",
    etaLabel: "Collected",
    orderTime: "May 13, 09:32:10"
  },
];

export default function KitchenQueuePage() {
  return (
    <div className="space-y-6">
      <KitchenQueuePanel items={queueItems} />
    </div>
  );
}
