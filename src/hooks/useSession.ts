import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils/constants";
import { LoginPayload, LoginResponse } from "../utils/types";

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
  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
};

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

export const useUser = () => {
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  if (!token) throw new Error("jwt token not found!");
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => getAuthUser(token),
  });
  return user;
};
