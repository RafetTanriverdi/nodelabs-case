import styles from "./RecentTransactions.module.scss";
import { HiChevronRight, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useMemo, useState } from "react";
import Skeleton from "@rt/components/ui/Skeleton/Skeleton";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import Button from "@rt/components/ui/Button/Button";

export type ApiTransaction = {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed";
};

type Props = {
  title?: string;
  transactions?: ApiTransaction[];
  onViewAll?: () => void;
  viewAllText?: string;
  viewLessText?: string;
  maxVisible?: number;
  locale?: string;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

function formatAmount(amount: number, currency: string, locale: string) {
  const abs = Math.abs(amount);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  }).format(abs);
}

function formatDate(iso: string, locale: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default function RecentTransactions({
  title = "Recent Transaction",
  transactions = [],
  onViewAll,
  viewAllText = "View All",
  viewLessText = "Show Less",
  maxVisible,
  locale = "en-GB",
  isLoading,
  error,
  onRetry,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand =
    typeof maxVisible === "number" &&
    Number.isFinite(maxVisible) &&
    maxVisible > 0
      ? transactions.length > maxVisible
      : false;

  const visibleTransactions = useMemo(() => {
    if (canExpand && !isExpanded) return transactions.slice(0, maxVisible);
    return transactions;
  }, [canExpand, isExpanded, maxVisible, transactions]);

  const showViewAllButton = Boolean(onViewAll) || canExpand;

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
      return;
    }
    if (!canExpand) return;
    setIsExpanded((v) => !v);
  };

  if (isLoading) {
    return (
      <Skeleton variant="card-md" aria-label="Loading recent transactions" />
    );
  }

  if (error) {
    return (
      <section className={styles.card} aria-label={title}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </header>

        <div className={styles.empty}>
          <ErrorState
            variant="inline"
            icon={<HiOutlineExclamationTriangle aria-hidden="true" />}
            title="Recent transactions unavailable"
            description={"Data could not be retrieved."}
            actions={
              onRetry ? (
                <Button variant="primary" type="button" onClick={onRetry}>
                  Try again
                </Button>
              ) : null
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {showViewAllButton ? (
          <button
            type="button"
            className={styles.viewAll}
            onClick={handleViewAll}
            aria-expanded={canExpand ? isExpanded : undefined}
          >
            {(canExpand && isExpanded ? viewLessText : viewAllText) as string}{" "}
            <HiChevronRight className={styles.arrow} aria-hidden="true" />
          </button>
        ) : null}
      </header>

      <div className={styles.table}>
        <div className={styles.thead} role="row">
          <div className={styles.th}>NAME/BUSINESS</div>
          <div className={styles.th}>TYPE</div>
          <div className={`${styles.th} ${styles.thAmount}`}>AMOUNT</div>
          <div className={`${styles.th} ${styles.thDate}`}>DATE</div>
        </div>

        <div className={styles.tbody}>
          {visibleTransactions.map((t, idx) => (
            <div
              key={t.id}
              className={styles.tr}
              role="row"
              data-last={
                idx === visibleTransactions.length - 1 ? "true" : "false"
              }
            >
              <div className={styles.tdName}>
                <div className={styles.iconWrap}>
                  <img
                    src={t.image}
                    alt={t.business}
                    className={styles.iconImg}
                    draggable={false}
                    loading="lazy"
                  />
                </div>

                <div className={styles.nameMeta}>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.business}>{t.business}</div>
                </div>
              </div>

              <div className={styles.tdType}>{t.type}</div>

              <div className={styles.tdAmount}>
                {formatAmount(t.amount, t.currency, locale)}
              </div>

              <div className={styles.tdDate}>{formatDate(t.date, locale)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
