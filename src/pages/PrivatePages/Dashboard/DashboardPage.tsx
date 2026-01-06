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
import { HiBars3, HiChevronDown, HiXMark } from "react-icons/hi2";
import { usePrivateLayoutStore } from "@rt/stores/private-layout-store";
import styles from "./DashboardPage.module.scss";
import { useDashboard } from "@rt/hooks/useDashboard";
import { ENDPOINTS } from "@rt/api/endpoints";

export default function DashboardPage() {
  const {
    summaryQuery,
    workingCapitalQuery,
    recentQuery,
    walletQuery,
    scheduledQuery,
  } = useDashboard();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <DashboardHeader />
        <div className={styles.grid}>
          <main className={styles.main} aria-label="Dashboard content">
            <SummaryCards
              data={summaryQuery.data?.data}
              isLoading={summaryQuery.isLoading}
              error={summaryQuery.error}
              onRetry={() => summaryQuery.refetch()}
            />

            <WorkingCapitalChart
              items={workingCapitalQuery.data?.data?.data}
              isLoading={workingCapitalQuery.isLoading}
              error={workingCapitalQuery.error}
              onRetry={() => workingCapitalQuery.refetch()}
            />

            <RecentTransactions
              transactions={recentQuery.data?.data?.transactions}
              maxVisible={4}
              isLoading={recentQuery.isLoading}
              error={recentQuery.error}
              onRetry={() => recentQuery.refetch()}
            />
          </main>

          <aside className={styles.aside} aria-label="Dashboard sidebar">
            <WalletCardStack
              topCard={walletQuery.data?.data?.cards?.[0]}
              bottomCard={walletQuery.data?.data?.cards?.[1]}
              isLoading={walletQuery.isLoading}
              error={walletQuery.error}
              onRetry={() => walletQuery.refetch()}
            />

            <ScheduledTransfers
              title="Scheduled Transfers"
              transfers={scheduledQuery.data?.data?.transfers}
              maxVisible={4}
              isLoading={scheduledQuery.isLoading}
              error={scheduledQuery.error}
              onRetry={() => scheduledQuery.refetch()}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

const DashboardHeader = () => {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["users-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get(ENDPOINTS.USER.PROFILE);
      return res.data;
    },
  });
  const isSidebarOpen = usePrivateLayoutStore((s) => s.isSidebarOpen);
  const toggleSidebar = usePrivateLayoutStore((s) => s.toggleSidebar);

  return (
    <div className={styles.headerContainer}>
      <button
        type="button"
        className={styles.mobileMenuBtn}
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        aria-controls="private-sidebar"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          <HiXMark aria-hidden="true" />
        ) : (
          <HiBars3 aria-hidden="true" />
        )}
      </button>
      <Text variant="title" className={styles.headerTitle}>
        Dashboard
      </Text>

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
          <span className={styles.profileName}>
            {profileLoading
              ? "Loading..."
              : profileError
                ? "Profile unavailable"
                : profile?.data?.fullName}
          </span>
          <HiChevronDown className={styles.profileChevron} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
};
