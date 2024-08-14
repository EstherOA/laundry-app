import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";

interface LoginResponse {
  token: string | null;
}

interface LoginPayload {
  phoneNumber: string;
  password: string;
  otp: string;
}

const useLogin = (): UseMutationResult<
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

export default useLogin;
