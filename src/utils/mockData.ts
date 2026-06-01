import type {
  CatalogItem,
  GrabAndGoBeverage,
  LocalCultureBento,
  Order,
  User,
} from "@/types";

export const localCultureBentos: LocalCultureBento[] = [
  {
    name: "Rendang Power Bento",
    basePrice: 52000,
    skuCode: "BENTO-RDG-01",
    currentPrice: 49000,
    calorieCount: 780,
    ingredients: ["Beef rendang", "Turmeric rice", "Sauteed greens", "Sambal"],
  },
  {
    name: "Ayam Betutu Express",
    basePrice: 48000,
    skuCode: "BENTO-BTT-02",
    currentPrice: 45000,
    calorieCount: 710,
    ingredients: ["Betutu chicken", "Steamed rice", "Lawar", "Boiled egg"],
  },
  {
    name: "Sambal Matah Ocean Box",
    basePrice: 50000,
    skuCode: "BENTO-SMO-03",
    currentPrice: 47500,
    calorieCount: 690,
    ingredients: ["Grilled tuna", "Red rice", "Sambal matah", "Pickled cucumber"],
  },
];

export const grabAndGoBeverages: GrabAndGoBeverage[] = [
  {
    name: "Es Teh Jawa",
    basePrice: 12000,
    skuCode: "BEV-ETJ-01",
    currentPrice: 10000,
    isRefrigerated: true,
  },
  {
    name: "Kopi Susu Aren Flash",
    basePrice: 22000,
    skuCode: "BEV-KSA-02",
    currentPrice: 20000,
    isRefrigerated: true,
  },
  {
    name: "Wedang Jahe Botol",
    basePrice: 18000,
    skuCode: "BEV-WJB-03",
    currentPrice: 18000,
    isRefrigerated: false,
  },
];

export const catalogItems: CatalogItem[] = [
  ...localCultureBentos,
  ...grabAndGoBeverages,
];

export const orders: Order[] = [
  {
    orderId: "ORD-240601-001",
    pickupCode: "BF1021",
    isPickedUp: false,
    status: "PENDING",
    items: [localCultureBentos[0], grabAndGoBeverages[1]],
    orderTime: "2026-06-01T08:15:00+07:00",
  },
  {
    orderId: "ORD-240601-002",
    pickupCode: "BF1028",
    isPickedUp: false,
    status: "READY",
    items: [localCultureBentos[1], grabAndGoBeverages[0]],
    orderTime: "2026-06-01T08:42:00+07:00",
  },
  {
    orderId: "ORD-240601-003",
    pickupCode: "BF1037",
    isPickedUp: true,
    status: "CLAIMED",
    items: [localCultureBentos[2], grabAndGoBeverages[2]],
    orderTime: "2026-06-01T09:05:00+07:00",
  },
  {
    orderId: "ORD-240601-004",
    pickupCode: "BF1044",
    isPickedUp: false,
    status: "GHOSTED",
    items: [localCultureBentos[0]],
    orderTime: "2026-06-01T07:30:00+07:00",
  },
];

export const users: User[] = [
  {
    userId: "USR-001",
    username: "alya.customer",
    karmaScore: 88,
    role: "CUSTOMER",
  },
  {
    userId: "USR-002",
    username: "bima.runner",
    karmaScore: 64,
    role: "CUSTOMER",
  },
  {
    userId: "USR-003",
    username: "kitchen.sari",
    karmaScore: 97,
    role: "KITCHEN_STAFF",
  },
  {
    userId: "USR-004",
    username: "admin.raka",
    karmaScore: 120,
    role: "SYSTEM_ADMIN",
  },
];
