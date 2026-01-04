import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@rt/api/http";
import { toast } from "react-toastify";

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
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data?.accessToken);
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
      const response = await axiosInstance.post("/users/register", {
        email,
        password,
        fullName,
      });
      return response.data;
    },
  });
}
