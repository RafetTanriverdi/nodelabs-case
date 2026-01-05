import styles from "./SummaryCards.module.scss";
import { formatMoney } from "@rt/utils/formatMoney";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { GiWallet } from "react-icons/gi";
import { IoWallet } from "react-icons/io5";

type Trend = "up" | "down";

type Change = {
  percentage: number;
  trend: Trend;
};

type AmountBlock = {
  amount: number;
  currency: string;
  change: Change;
};

export type FinancialSummaryResponse = {
  totalBalance: AmountBlock;
  totalExpense: AmountBlock;
  totalSavings: AmountBlock;
  lastUpdated: string;
};

type Props = {
  data: FinancialSummaryResponse;
};

export default function SummaryCards({ data }: Props) {
  return (
    <div className={styles.summaryGrid}>
      <SummaryCard
        title="Total balance"
        amount={data.totalBalance.amount}
        currency={data.totalBalance.currency}
        change={data.totalBalance.change}
        icon={<IoWallet color="#C8EE44" />}
        variant="dark"
      />

      <SummaryCard
        title="Total spending"
        amount={data.totalExpense.amount}
        currency={data.totalExpense.currency}
        change={data.totalExpense.change}
        icon={<IoWallet />}
        variant="light"
      />

      <SummaryCard
        title="Total saved"
        amount={data.totalSavings.amount}
        currency={data.totalSavings.currency}
        change={data.totalSavings.change}
        icon={<GiWallet />}
        variant="light"
      />
    </div>
  );
}

function SummaryCard({
  title,
  amount,
  currency,
  change,
  variant,
  icon,
}: {
  title: string;
  amount: number;
  currency: string;
  change: Change;
  variant: "dark" | "light";
  icon: React.ReactNode;
}) {
  const isUp = change.trend === "up";
  const Icon = isUp ? HiArrowTrendingUp : HiArrowTrendingDown;

  return (
    <div className={variant === "dark" ? styles.cardDark : styles.cardLight}>
      <div className={styles.topRow}>
        <div className={isUp ? styles.badgeUp : styles.badgeDown}>
          <Icon className={styles.badgeIcon} />
          <span>{Math.abs(change.percentage).toFixed(1)}%</span>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div
          className={variant === "dark" ? styles.iconDarkWrap : styles.iconWrap}
          data-icon={icon}
          aria-hidden="true"
        >
          {icon}
        </div>

        <div className={styles.meta}>
          <div className={styles.title}>{title}</div>
          <div className={styles.amount}>
            {formatMoney(amount, currency, { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}
