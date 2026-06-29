export type SubscriptionStatus = "active" | "paused" | "churned";
export type DeliveryStatus = "delivered" | "pending" | "skipped";
export type PaymentStatus = "paid" | "pending" | "failed";

export interface Subscription {
  id: string;
  plan: "toned" | "full_cream" | "a2_gir";
  quantityMl: number;
  pricePerLitre: number;
  status: SubscriptionStatus;
  startDate: string;
  pauseFrom?: string;
  pauseTo?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  flat: string;
  building: string;
  area: string;
  pincode: string;
  routeId: string;
  subscription: Subscription;
  joinDate: string;
}

export interface DeliveryStop {
  customerId: string;
  name: string;
  address: string;
  quantityMl: number;
  plan: string;
  status: DeliveryStatus;
  skipReason?: string;
}

export interface Route {
  id: string;
  name: string;
  area: string;
  execId: string;
  execName: string;
  stops: DeliveryStop[];
}

export interface DeliveryExec {
  id: string;
  name: string;
  phone: string;
  routeId: string;
}

export interface Payment {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  description: string;
}

export interface Collection {
  week: string;
  amount: number;
  month: string;
  year: number;
}

export interface Order {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  category: string;
}
