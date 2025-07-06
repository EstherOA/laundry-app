import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ordersApi from "../api/orders";
import { OrderFormValues, PaymentFormValues } from "../utils/types";

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
