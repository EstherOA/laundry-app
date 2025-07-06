import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customersApi from "../api/customers";
import { CustomerFormValues } from "../utils/types";

// Query hook to get all customers
export const useCustomers = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["customers"],
    queryFn: () => customersApi.getCustomers(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific customer by ID
export const useCustomerById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => customersApi.getCustomerById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new customer
export const useAddCustomer = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (data: CustomerFormValues) =>
      customersApi.addCustomer(token!, data),
    onSuccess: () => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Mutation hook to edit a customer
export const useEditCustomer = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CustomerFormValues }) =>
      customersApi.editCustomer(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch customers list and specific customer
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customers", id] });
    },
  });
};

// Mutation hook to delete a customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (id: string) => customersApi.deleteCustomer(token!, id),
    onSuccess: (_, id) => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      // Remove the specific customer from cache
      queryClient.removeQueries({ queryKey: ["customers", id] });
    },
  });
};
