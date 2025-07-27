import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/constants";
import { LoginPayload, LoginResponse } from "../utils/types";
import staffApi from "../api/staff";

// Local storage key for the JWT token
const TOKEN_STORAGE_KEY = "userToken";

// Helper function to get token from localStorage
const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

// Helper function to save token to localStorage
const saveTokenToStorage = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

// Helper function to remove token from localStorage
const removeTokenFromStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const getAuthUser = async (token: string) => {
  const id = (jwtDecode(token) as any).userId;

  const url = `${BASE_URL}/staff/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginPayload,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const url = `${BASE_URL}/auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data.token;
    },
    onSuccess: (data) => {
      // Save token to localStorage
      saveTokenToStorage(data);
      // Update query cache
      queryClient.setQueryData(["userToken"], data);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    // Remove token from localStorage
    removeTokenFromStorage();
    // Clear query cache
    queryClient.setQueryData(["userToken"], null);
    queryClient.removeQueries({ queryKey: ["authUser"] });
  };
};

export const useToken = () => {
  const { data: token } = useQuery<string | null>({
    queryKey: ["userToken"],
    queryFn: () => getStoredToken(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return token;
};

export const useUser = () => {
  const { data: token } = useQuery<string | null>({
    queryKey: ["userToken"],
    queryFn: () => getStoredToken(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => (token ? getAuthUser(token) : null),
    enabled: !!token,
  });
  return user;
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  return useMutation({
    mutationFn: async ({
      userId,
      newPassword,
    }: {
      userId: string;
      newPassword: string;
    }) => {
      return await staffApi.editStaff(token!, userId, {
        password: newPassword,
        hasDefaultPassword: false,
      });
    },
    onSuccess: (_, { userId }) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["staff", userId] });
    },
  });
};
