import { formatMoneyTransfers } from "@rt/utils/formatMoney";
import styles from "./ScheduledTransfers.module.scss";
import { formatDateLabel } from "@rt/utils/format-date";
import Text from "@rt/components/ui/Text/Text";
import { HiChevronRight, HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useMemo, useState } from "react";
import Skeleton from "@rt/components/ui/Skeleton/Skeleton";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import Button from "@rt/components/ui/Button/Button";

export type ScheduledTransfer = {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: "scheduled" | "completed" | "cancelled";
};

type Props = {
  title?: string;
  transfers?: ScheduledTransfer[];
  onViewAll?: () => void;
  viewAllText?: string;
  viewLessText?: string;
  maxVisible?: number;
  locale?: string;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

export default function ScheduledTransfers({
  title = "Scheduled Transfers",
  transfers = [],
  onViewAll,
  viewAllText = "View All",
  viewLessText = "Show Less",
  maxVisible,
  locale = "en-US",
  isLoading,
  error,
  onRetry,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand =
    typeof maxVisible === "number" &&
    Number.isFinite(maxVisible) &&
    maxVisible > 0
      ? transfers.length > maxVisible
      : false;

  const visibleTransfers = useMemo(() => {
    if (canExpand && !isExpanded) return transfers.slice(0, maxVisible);
    return transfers;
  }, [canExpand, isExpanded, maxVisible, transfers]);

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
      <Skeleton variant="card-md" aria-label="Loading scheduled transfers" />
    );
  }

  if (error) {
    return (
      <section className={styles.card} aria-label={title}>
        <header className={styles.header}>
          <Text variant="subtitle">{title}</Text>
        </header>
        <div className={styles.empty}>
          <ErrorState
            variant="inline"
            icon={<HiOutlineExclamationTriangle aria-hidden="true" />}
            title="Scheduled transfers unavailable"
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
        <Text variant="subtitle">{title}</Text>

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

      <div className={styles.list} role="list">
        {visibleTransfers.map((t, idx) => (
          <div
            key={t.id}
            className={styles.row}
            role="listitem"
            data-last={idx === visibleTransfers.length - 1 ? "true" : "false"}
          >
            <div className={styles.left}>
              <div className={styles.avatarWrap}>
                <img
                  src={t.image}
                  alt={t.name}
                  className={styles.avatar}
                  draggable={false}
                  loading="lazy"
                />
              </div>

              <div className={styles.meta}>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.sub}>
                  {formatDateLabel(t.date, locale)}
                </div>
              </div>
            </div>

            <div className={styles.amount}>
              {formatMoneyTransfers(t.amount, t.currency, locale)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
