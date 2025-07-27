import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ordersApi from "../api/orders";
import { OrderFormValues, PaymentFormValues } from "../utils/types";
import { Payment } from "../utils/types";
import {
  startOfWeek,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";

// Query hook to get all orders
export const useOrders = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersApi.getOrders(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific order by ID
export const useOrderById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getOrderById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new order
export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (data: OrderFormValues) => ordersApi.addOrder(token!, data),
    onSuccess: () => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Mutation hook to edit an order
export const useEditOrder = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: OrderFormValues }) =>
      ordersApi.editOrder(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch orders list and specific order
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
};

// Mutation hook to delete an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (id: string) => ordersApi.deleteOrder(token!, id),
    onSuccess: (_, id) => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      // Remove the specific order from cache
      queryClient.removeQueries({ queryKey: ["orders", id] });
    },
  });
};

// Mutation hook to add payment to an order
export const useAddPayment = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PaymentFormValues }) =>
      ordersApi.addPayment(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the specific order to show updated payment info
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      // Also invalidate orders list in case payment status affects the list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Mutation hook to update order payment status
export const useUpdateOrderPaymentStatus = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({
      id,
      paymentStatus,
    }: {
      id: string;
      paymentStatus: string;
    }) => ordersApi.editOrder(token!, id, { paymentStatus }),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the specific order and orders list
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Hook to generate a summary of orders processed for the current week
export const useWeeklyOrderSummary = () => {
  const { data: orders, isLoading, error } = useOrders();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // Prepare a map for each day of the week
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      date: format(date, "dd/MM/yyyy"),
      complete: 0,
      pending: 0,
      cancelled: 0,
    };
  });

  if (orders && Array.isArray(orders)) {
    orders.forEach((order) => {
      // Use orderDate if available, otherwise fallback to createdAt
      const orderDateStr = order.orderDate || order.createdAt;
      const orderDate = parseISO(orderDateStr);
      if (isWithinInterval(orderDate, { start: weekStart, end: weekEnd })) {
        const dayIdx = orderDate.getDay() === 0 ? 6 : orderDate.getDay() - 1; // Monday=0, Sunday=6
        if (order.orderStatus === "complete") days[dayIdx].complete++;
        else if (order.orderStatus === "pending") days[dayIdx].pending++;
        else if (order.orderStatus === "cancelled") days[dayIdx].cancelled++;
      }
    });
  }

  return { summary: days, isLoading, error };
};

// Hook to get revenue summary from all payments per order each month
export const useMonthlyRevenueSummary = (dashboard: boolean = false) => {
  const { data: orders, isLoading, error } = useOrders();
  const payments: { amount: number; createdAt: string }[] = [];

  if (orders && Array.isArray(orders)) {
    orders.forEach((order) => {
      if (Array.isArray(order.payments)) {
        order.payments.forEach((payment: Payment) => {
          payments.push({
            amount: payment.amount,
            createdAt: payment.createdAt,
          });
        });
      }
    });
  }

  // Group payments by month
  const revenueMap: Record<string, number> = {};
  payments.forEach(({ amount, createdAt }) => {
    const date = parseISO(createdAt);
    const month = format(date, "MMM yyyy");
    if (!revenueMap[month]) revenueMap[month] = 0;
    revenueMap[month] += amount;
  });

  let summary = Object.entries(revenueMap)
    .map(([month, totalRevenue]) => ({ month, totalRevenue }))
    .sort((a, b) => a.month.localeCompare(b.month));

  if (dashboard) {
    summary = summary.slice(-6);
  }

  return { summary, isLoading, error };
};
