import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import { LoginPayload, LoginResponse } from "../utils/types";

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginPayload,
  unknown
> => {
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
  });
};

export const useToken = () => {
  const { data: token } = useQuery<string | null>({
    queryKey: ["userToken"],
    enabled: false,
  });

  return token;
};
