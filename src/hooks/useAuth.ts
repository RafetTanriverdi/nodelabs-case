import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@rt/api/http";
import { toast } from "react-toastify";
import { clearToken, setToken } from "@rt/authentication/auth-utils";
import { ENDPOINTS } from "@rt/api/endpoints";

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = LoginRequest & {
  fullName: string;
};

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginRequest) => {
      const response = await axiosInstance.post(ENDPOINTS.USER.LOGIN, {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      const token = data.data?.accessToken;
      if (typeof token === "string" && token) setToken(token);
      toast.success("Login successful!");
    },
    onError: (error: Error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ email, password, fullName }: RegisterRequest) => {
      const response = await axiosInstance.post(ENDPOINTS.USER.REGISTER, {
        email,
        password,
        fullName,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Register failed: ${error.message}`);
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axiosInstance.post(ENDPOINTS.USER.LOGOUT);
      return response.data;
    },
    onSuccess: () => {
      clearToken();
      toast.success("Logged out successfully.");
    },
    onError: (error: Error) => {
      toast.error(`Logout failed: ${error.message}`);
    },
  });
}
