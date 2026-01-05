import axiosInstance from "@rt/api/http";
import WorkingCapitalChart from "@rt/components/dashboard/WorkingCapitalChart/WorkingCapitalChart";
import RecentTransactions from "@rt/components/dashboard/RecentTransactions/RecentTransactions";
import ScheduledTransfers from "@rt/components/dashboard/ScheduledTransfers/ScheduledTransfers";
import SummaryCards from "@rt/components/dashboard/SummaryCards/SummaryCards";
import WalletCardStack from "@rt/components/dashboard/WalletCardStack/WalletCardStack";
import { useQuery } from "@tanstack/react-query";
import Text from "@rt/components/ui/Text/Text";
import { HiOutlineSearch } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import styles from "./DashboardPage.module.scss";

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/summary");
      return res.data;
    },
  });
  const { data: workingCapital, isLoading: workingCapitalLoading } = useQuery({
    queryKey: ["dashboard-workingCapital"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/working-capital");
      return res.data;
    },
  });
  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["dashboard-wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/wallet");
      return res.data;
    },
  });
  const { data: recent, isLoading: recentLoading } = useQuery({
    queryKey: ["dashboard-recent"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/transactions/recent");
      return res.data;
    },
  });
  const { data: scheduled, isLoading: scheduledLoading } = useQuery({
    queryKey: ["dashboard-scheduled"],
    queryFn: async () => {
      const res = await axiosInstance.get("/financial/transfers/scheduled");
      return res.data;
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DashboardHeader />
      {walletLoading ? (
        "Loading..."
      ) : (
        <WalletCardStack
          topCard={wallet?.data?.cards[0] ?? []}
          bottomCard={wallet?.data?.cards[1] ?? []}
        />
      )}
      {workingCapitalLoading ? (
        "Loading..."
      ) : (
        <WorkingCapitalChart items={workingCapital?.data?.data} />
      )}

      {summaryLoading ? "Loading..." : <SummaryCards data={summary?.data} />}

      {recentLoading ? (
        "Loading..."
      ) : (
        <RecentTransactions transactions={recent?.data?.transactions ?? []} />
      )}
      {scheduledLoading ? (
        "Loading..."
      ) : (
        <ScheduledTransfers
          title="Scheduled Transfers"
          transfers={scheduled?.data?.transfers ?? []}
        />
      )}
    </div>
  );
}

const DashboardHeader = () => {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["users-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/profile");
      return res.data;
    },
  });

  return (
    <div className={styles.headerContainer}>
      <Text variant="title">Dashboard</Text>

      <div className={styles.headerRight}>
        <HiOutlineSearch color="#929EAE" className={styles.icon} />
        <IoNotifications color="#929EAE" className={styles.icon} />
        <span className={styles.profileContainer}>
          <img
            className={styles.profileImage}
            src={"https://randomuser.me/api/portraits/men/52.jpg"}
            alt="Profile"
          />
          {profileLoading ? "Loading..." : profile?.data?.fullName}
        </span>
      </div>
    </div>
  );
};
