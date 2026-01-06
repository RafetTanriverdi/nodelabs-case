import axiosInstance from "@rt/api/http";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/api/endpoints";

export function useDashboard() {
  const summaryQuery = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.FINANCIAL.SUMMARY);
      return res.data;
    },
  });

  const workingCapitalQuery = useQuery({
    queryKey: ["dashboard-workingCapital"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.FINANCIAL.CAPITAL);
      return res.data;
    },
  });

  const walletQuery = useQuery({
    queryKey: ["dashboard-wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.FINANCIAL.WALLET);
      return res.data;
    },
  });

  const recentQuery = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.FINANCIAL.RECENT);
      return res.data;
    },
  });

  const scheduledQuery = useQuery({
    queryKey: ["dashboard-scheduled"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.FINANCIAL.SCHEDULED);
      return res.data;
    },
  });

  return {
    summaryQuery,
    workingCapitalQuery,
    walletQuery,
    recentQuery,
    scheduledQuery,
  };
}
