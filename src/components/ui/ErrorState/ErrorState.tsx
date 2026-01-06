import type React from "react";
import clsx from "clsx";
import Text from "@rt/components/ui/Text/Text";
import styles from "./ErrorState.module.scss";

type Props = {
  title: string;
  description?: string;
  code?: string;
  details?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export default function ErrorState({
  title,
  description,
  code,
  details,
  icon,
  actions,
  className,
}: Props) {
  return (
    <section className={clsx(styles.card, className)} role="alert" aria-live="polite">
      {(icon || code) && (
        <div className={styles.topRow}>
          {icon ? <div className={styles.iconWrap}>{icon}</div> : null}
          {code ? <div className={styles.code}>{code}</div> : null}
        </div>
      )}

      <Text variant="title" className={styles.title}>
        {title}
      </Text>

      {description ? (
        <Text variant="subtitle" muted className={styles.description}>
          {description}
        </Text>
      ) : null}

      {details ? (
        <div className={styles.details} aria-label="Error details">
          {details}
        </div>
      ) : null}

      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </section>
  );
}

