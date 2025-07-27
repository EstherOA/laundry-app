import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import logApi from "../api/log";
import { Log } from "../utils/types";
import { useUser } from "./useSession";

// Query hook to get all logs
export const useLogs = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["logs"],
    queryFn: () => logApi.getLogs(token!),
    enabled: !!token,
  });
};

// Query hook to get a specific service by ID
export const useLogById = (id: string) => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useQuery({
    queryKey: ["logs", id],
    queryFn: () => logApi.getLogById(token!, id),
    enabled: !!token && !!id,
  });
};

// Mutation hook to add a new service
export const useAddLog = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });
  const user = useUser();

  return useMutation({
    mutationFn: (data: Partial<Log>) =>
      logApi.addLog(token!, { ...data, staffId: user.staffId }),
    onSuccess: () => {
      // Invalidate and refetch logs list
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};
