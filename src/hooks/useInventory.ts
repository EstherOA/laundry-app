import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import inventoryApi from "../api/inventory";
import { InventoryFormValues, Inventory } from "../utils/types";
import { subMonths, format, startOfMonth, isAfter } from "date-fns";

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

// Hook to get a summary of inventory items and their statuses
export const useInventorySummary = () => {
  const { data: inventory, isLoading, error } = useInventory();

  const summary =
    inventory?.map((item: Inventory) => ({
      item: item.itemName,
      status: item.status,
      quantity: item.quantity,
    })) || [];

  return { summary, isLoading, error };
};

const getLast6Months = () => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    months.push(format(date, "MMM yyyy"));
  }
  return months;
};

export const useInventoryMonthlyStats = () => {
  const { data: inventory, isLoading, error } = useInventory();
  const months = getLast6Months();
  // Get all unique item names
  const itemNames: string[] = Array.from(
    new Set((inventory || []).map((item: any) => item.itemName))
  );
  const stats = months.map((monthLabel, idx) => {
    const monthStart = startOfMonth(subMonths(new Date(), 5 - idx));
    const nextMonthStart =
      idx < 5 ? startOfMonth(subMonths(new Date(), 4 - idx)) : new Date();
    const entry: any = { month: monthLabel };
    itemNames.forEach((itemName) => {
      entry[itemName] = (inventory || []).filter((item: any) => {
        const date = new Date(item.datePurchased || item.createdAt);
        return (
          item.itemName === itemName &&
          isAfter(date, monthStart) &&
          (idx === 5 ? date <= nextMonthStart : date < nextMonthStart)
        );
      }).length;
    });
    return entry;
  });
  return { stats, isLoading, error, itemNames };
};
