import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import inventoryApi from "../api/inventory";
import { InventoryFormValues } from "../utils/types";

// Query hook to get all inventory items
export const useInventory = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => inventoryApi.getInventory(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific inventory item by ID
export const useInventoryItemById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["inventory", id],
    queryFn: () => inventoryApi.getItemById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new inventory item
export const useAddInventoryItem = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (data: InventoryFormValues) =>
      inventoryApi.addItem(token!, data),
    onSuccess: () => {
      // Invalidate and refetch inventory list
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
};

// Mutation hook to edit an inventory item
export const useEditInventoryItem = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryFormValues }) =>
      inventoryApi.editItem(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch inventory list and specific item
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", id] });
    },
  });
};

// Mutation hook to delete an inventory item
export const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (id: string) => inventoryApi.deleteItem(token!, id),
    onSuccess: (_, id) => {
      // Invalidate and refetch inventory list
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      // Remove the specific inventory item from cache
      queryClient.removeQueries({ queryKey: ["inventory", id] });
    },
  });
};
