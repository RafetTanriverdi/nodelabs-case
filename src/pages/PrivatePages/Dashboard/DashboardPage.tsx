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
import { HiChevronDown } from "react-icons/hi2";
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
    <div className={styles.page}>
      <div className={styles.container}>
        <DashboardHeader />

        <div className={styles.grid}>
          <main className={styles.main} aria-label="Dashboard content">
            {summaryLoading ? (
              <div className={styles.summarySkeleton} aria-busy="true" />
            ) : (
              <SummaryCards data={summary?.data} />
            )}

            {workingCapitalLoading ? (
              <div className={styles.cardSkeletonLg} aria-busy="true" />
            ) : (
              <WorkingCapitalChart items={workingCapital?.data?.data ?? []} />
            )}

            {recentLoading ? (
              <div className={styles.cardSkeletonMd} aria-busy="true" />
            ) : (
              <RecentTransactions
                transactions={recent?.data?.transactions ?? []}
                maxVisible={4}
              />
            )}
          </main>

          <aside className={styles.aside} aria-label="Dashboard sidebar">
            {walletLoading ? (
              <div className={styles.cardSkeletonSm} aria-busy="true" />
            ) : (
              <WalletCardStack
                topCard={
                  wallet?.data?.cards?.[0] ?? {
                    brand: "Fintech.",
                    bank: "Universal Bank",
                    cardNumber:
                      "ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ",
                    expiryMonth: "09",
                    expiryYear: "25",
                    network: "Visa",
                  }
                }
                bottomCard={
                  wallet?.data?.cards?.[1] ?? {
                    brand: "Fintech.",
                    bank: "Commercial Bank",
                    cardNumber:
                      "ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ",
                    expiryMonth: "09",
                    expiryYear: "25",
                    network: "Mastercard",
                  }
                }
              />
            )}

            {scheduledLoading ? (
              <div className={styles.cardSkeletonMd} aria-busy="true" />
            ) : (
              <ScheduledTransfers
                title="Scheduled Transfers"
                transfers={scheduled?.data?.transfers ?? []}
                maxVisible={4}
              />
            )}
          </aside>
        </div>
      </div>
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
        <button type="button" className={styles.iconBtn} aria-label="Search">
          <HiOutlineSearch className={styles.icon} />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Notifications"
        >
          <IoNotifications className={styles.icon} />
        </button>
        <span className={styles.profileContainer}>
          <img
            className={styles.profileImage}
            src={"https://randomuser.me/api/portraits/men/52.jpg"}
            alt="Profile"
          />
          {profileLoading ? "Loading..." : profile?.data?.fullName}
          <HiChevronDown className={styles.profileChevron} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};
