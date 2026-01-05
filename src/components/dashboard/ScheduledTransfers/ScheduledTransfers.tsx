import { formatMoneyTransfers } from "@rt/utils/formatMoney";
import styles from "./ScheduledTransfers.module.scss";
import { formatDateLabel } from "@rt/utils/format-date";
import Text from "@rt/components/ui/Text/Text";

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
  transfers: ScheduledTransfer[];
  onViewAll?: () => void;
  viewAllText?: string;
  locale?: string;
};

export default function ScheduledTransfers({
  title = "Scheduled Transfers",
  transfers,
  onViewAll,
  viewAllText = "View All",
  locale = "en-US",
}: Props) {
  return (
    <section className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <Text variant="subtitle">{title}</Text>

        <button type="button" className={styles.viewAll} onClick={onViewAll}>
          {viewAllText} <span className={styles.arrow}>›</span>
        </button>
      </header>

      <div className={styles.list} role="list">
        {transfers.map((t, idx) => (
          <div
            key={t.id}
            className={styles.row}
            role="listitem"
            data-last={idx === transfers.length - 1 ? "true" : "false"}
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
