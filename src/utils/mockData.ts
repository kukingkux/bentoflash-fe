export interface LocalCultureBento {
  skuCode: string;
  name: string;
  price: number;
  calories: number;
}

export interface GrabAndGoBeverage {
  skuCode: string;
  name: string;
  price: number;
  refrigerated: boolean;
}

export interface OrderResponse {
  orderId: number;
  skuCode: string;
  status: "PENDING" | "READY";
  isPickedUp: boolean;
  pickupCode: string | null;
}

export const mockCatalog: Array<LocalCultureBento | GrabAndGoBeverage> = [
  {
    skuCode: "TT-BNTO-RENDANG-01",
    name: "Nasi Padang Rendang",
    price: 20000,
    calories: 545,
  },
  {
    skuCode: "TT-BVG-ESTEH-02",
    name: "Es Teh Manis",
    price: 5000,
    refrigerated: true,
  },
];

export const mockOrders: OrderResponse[] = [
  {
    orderId: 1001,
    skuCode: "TT-BNTO-RENDANG-01",
    status: "PENDING",
    isPickedUp: false,
    pickupCode: "PICK-1001",
  },
  {
    orderId: 1002,
    skuCode: "TT-BVG-ESTEH-02",
    status: "READY",
    isPickedUp: false,
    pickupCode: "PICK-1002",
  },
  {
    orderId: 1003,
    skuCode: "TT-BNTO-RENDANG-01",
    status: "PENDING",
    isPickedUp: true,
    pickupCode: null,
  },
];
