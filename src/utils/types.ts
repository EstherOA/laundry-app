export type Shift = "odd" | "even";

export type ServiceType = "washing" | "dry-cleaning" | "ironing";

export type OrderStatus =
  | "pending"
  | "cancelled"
  | "overdue"
  | "complete"
  | "almost-due";

export type PaymentStatus = "none" | "partial" | "full";

type PaymentMode = "momo" | "cash";
type ItemStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Staff {
  _id: string;
  staffId: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  contract: string;
  address: string;
  password: string;
  phoneNumber: string;
  shift: Shift;
  dateCommenced: string;
  salary: number;
  ssnit: string;
  tin: string;
  createdAt: string;
  updatedAt: string;
}
export interface Service {
  _id: string;
  serviceId: string;
  itemName: string;
  serviceType: ServiceType;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  duration: number;
}
export interface LoginResponse {
  token: string | null;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
  otp: string;
}

export interface OrderItem {
  id: number;
  serviceId: string;
  serviceType: string;
  quantity: string;
  price: string;
  dueDate: number;
}

export interface Order {
  _id: string;
  orderId: string;
  items: Service[];
  totalAmount: number;
  orderStatus: OrderStatus;
  customerName: {
    name: string;
    customerId: string;
  };
  createdBy: string;
  createdAt: string;
  orderDate: string;
  deliveredBy: string;
  paymentStatus: PaymentStatus;
  invoiceId: string;
  payments: Payment[];
  deliveryDate: string;
  recordedBy: {
    name: string;
    staffId: string;
  };
  processedBy: {
    name: string;
    staffId: string;
  };
}

interface Payment {}

export interface Customer {
  _id: string;
  customerId: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deliveryNotes: string;
  landmark: string;
}

export interface Inventory {
  _id: string;
  itemId: string;
  itemName: string;
  description: string;
  price: number;
  quantity: number;
  status: ItemStatus;
  purchasedBy: {
    name: string;
    staffId: string;
  };
  vendor: string;
  datePurchased: string;
  paymentMode: PaymentMode;
  paymentReceipt: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormValues = Omit<
  Customer,
  "_id" | "name" | "createdAt" | "updatedAt"
>;

export type StaffFormValues = Omit<
  Staff,
  "_id" | "name" | "createdAt" | "updatedAt"
>;

export type InventoryFormValues = Omit<
  Inventory,
  "_id" | "createdAt" | "updatedAt" | "purchasedBy"
> & {
  purchasedBy: string;
};

export type ServiceFormValues = Omit<
  Service,
  "_id" | "createdAt" | "updatedAt"
>;

export type OrderFormValues = Omit<
  Service,
  "_id" | "createdAt" | "updatedAt" | "purchasedBy"
> & {
  purchasedBy: string;
};
