import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import staffApi from "../api/staff";
import { StaffFormValues } from "../utils/types";
import { useUser, useToken } from "./useSession";
import { subMonths, format, startOfMonth, isAfter } from "date-fns";

// Helper to get last 6 months labels
const getLast6Months = () => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    months.push(format(date, "MMM yyyy"));
  }
  return months;
};

export const useStaffStats = () => {
  const token = useToken();
  return useQuery({
    queryKey: ["staffStats"],
    queryFn: async () => {
      const staffList = await staffApi.getStaff(token!);
      const months = getLast6Months();
      let runningTotal = 0;
      const monthCounts = months.map((monthLabel, idx) => {
        const monthStart = startOfMonth(subMonths(new Date(), 5 - idx));
        const nextMonthStart =
          idx < 5 ? startOfMonth(subMonths(new Date(), 4 - idx)) : new Date();
        const newCount = staffList.filter((staff: any) => {
          const created = new Date(staff.createdAt);
          return (
            isAfter(created, monthStart) &&
            (idx === 5 ? created <= nextMonthStart : created < nextMonthStart)
          );
        }).length;
        runningTotal += newCount;
        return { month: monthLabel, new: newCount, total: runningTotal };
      });
      return monthCounts;
    },
    enabled: !!token,
  });
};

// Query hook to get all staff
export const useStaff = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["staff"],
    queryFn: () => staffApi.getStaff(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific staff member by ID
export const useStaffById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => staffApi.getStaffById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new staff member
export const useAddStaff = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (data: StaffFormValues) => staffApi.addStaff(token!, data),
    onSuccess: () => {
      // Invalidate and refetch staff list
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
};

// Mutation hook to edit a staff member
export const useEditStaff = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StaffFormValues }) =>
      staffApi.editStaff(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch staff list and specific staff member
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      queryClient.invalidateQueries({ queryKey: ["staff", id] });
    },
  });
};

// Mutation hook to delete a staff member
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (id: string) => staffApi.deleteStaff(token!, id),
    onSuccess: (_, id) => {
      // Invalidate and refetch staff list
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      // Remove the specific staff member from cache
      queryClient.removeQueries({ queryKey: ["staff", id] });
    },
  });
};
