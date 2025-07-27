import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import staffApi from "../api/staff";
import { StaffFormValues } from "../utils/types";
import { useUser } from "./useSession";

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
