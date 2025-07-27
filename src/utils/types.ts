export type ServiceType = "washing" | "dry-cleaning" | "ironing";

export type OrderStatus =
  | "pending"
  | "cancelled"
  | "overdue"
  | "complete"
  | "almost-due";

export type PaymentStatus = "none" | "partial" | "full";

export type PaymentMode = "momo" | "cash";
export type ItemStatus = "in-stock" | "low-stock" | "out-of-stock";

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
  hasDefaultPassword: boolean;
  phoneNumber: string;
  shift: string;
  dateCommenced: string;
  salary: number;
  ssnit: string;
  idNumber: string;
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
  itemName: string;
  serviceId: string;
  serviceType: string;
  quantity: string;
  price: string;
  duration: number;
}

export interface Order {
  _id: string;
  orderId: string;
  items: Service[];
  totalAmount: number;
  orderStatus: OrderStatus;
  customer: {
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    deliveryNotes: string;
    landmark: string;
    customerId: string;
  };
  createdAt: string;
  orderDate: string;
  deliveredBy: {
    name: string;
    staffId: string;
  };
  paymentStatus: PaymentStatus;
  invoiceId: string;
  payments: Payment[];
  deliveryDate: string;
  dueDate: string;
  recordedBy: {
    name: string;
    staffId: string;
  };
  processedBy: {
    name: string;
    staffId: string;
  };
}

export interface Payment {
  paymentId: string;
  mode: PaymentMode;
  amount: number;
  receipt: string;
  sender: string;
  paymentStatus: PaymentStatus;
  senderPhoneNumber: string;
  processedBy: {
    name: string;
    staffId: string;
  };
  createdAt: string;
  updatedAt: string;
}

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
export interface Log {
  _id: string;
  resourceId: string;
  message: string;
  type: LogType;
  staffId: string;
  createdAt: string;
}

export type LogType = "access" | "create" | "update" | "delete";

export type CustomerFormValues = Omit<
  Customer,
  "_id" | "name" | "createdAt" | "updatedAt" | "customerId"
>;

export type StaffFormValues = Omit<
  Staff,
  "_id" | "name" | "createdAt" | "updatedAt" | "staffId"
>;

export type InventoryFormValues = Omit<
  Inventory,
  "_id" | "createdAt" | "updatedAt" | "purchasedBy" | "itemId"
> & {
  purchasedBy: string;
};

export type EditInventoryFormValues = Omit<
  Inventory,
  "_id" | "createdAt" | "updatedAt" | "purchasedBy"
> & {
  purchasedBy: string;
  status: ItemStatus;
};

export type ServiceFormValues = Omit<
  Service,
  "_id" | "createdAt" | "updatedAt" | "serviceId"
>;

export type OrderFormValues = Omit<
  Order,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "customer"
  | "orderStatus"
  | "orderDate"
  | "deliveredBy"
  | "deliveryDate"
  | "recordedBy"
  | "paymentStatus"
  | "invoiceId"
  | "payments"
  | "processedBy"
  | "items"
  | "orderId"
> & {
  processedBy: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  address: string;
  landmark: string;
  deliveryNotes: string;
};

export type PaymentFormValues = Omit<
  Payment,
  "paymentId" | "createdAt" | "updatedAt" | "paymentStatus" | "processedBy"
> & {
  processedBy: string;
};
