import axiosInstance from "@rt/api/http";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data: summary } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/summary");
      return res.data;
    },
  });
  const { data: workingCapital } = useQuery({
    queryKey: ["dashboard-workingCapital"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/working-capital");
      return res.data;
    },
  });
  const { data: wallet } = useQuery({
    queryKey: ["dashboard-wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/wallet");
      return res.data;
    },
  });
  const { data: recent } = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/transactions/recent");
      return res.data;
    },
  });
  const { data: scheduled } = useQuery({
    queryKey: ["dashboard-scheduled"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/transfers/scheduled");
      return res.data;
    },
  });

  console.log(summary, workingCapital, wallet, recent, scheduled);
  return <div>DashboardPage</div>;
}
