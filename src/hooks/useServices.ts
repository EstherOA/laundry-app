import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import servicesApi from "../api/services";
import { ServiceFormValues } from "../utils/types";

// Query hook to get all services
export const useServices = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["services"],
    queryFn: () => servicesApi.getServices(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific service by ID
export const useServiceById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["services", id],
    queryFn: () => servicesApi.getServiceById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new service
export const useAddService = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (data: ServiceFormValues) =>
      servicesApi.addService(token!, data),
    onSuccess: () => {
      // Invalidate and refetch services list
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

// Mutation hook to edit a service
export const useEditService = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceFormValues }) =>
      servicesApi.editService(token!, id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch services list and specific service
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services", id] });
    },
  });
};

// Mutation hook to delete a service
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: (id: string) => servicesApi.deleteService(token!, id),
    onSuccess: (_, id) => {
      // Invalidate and refetch services list
      queryClient.invalidateQueries({ queryKey: ["services"] });
      // Remove the specific service from cache
      queryClient.removeQueries({ queryKey: ["services", id] });
    },
  });
};
