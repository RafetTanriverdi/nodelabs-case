import styles from "./PageLoader.module.scss";

export default function PageLoader() {
  return (
    <div className={styles.container} aria-busy="true" aria-label="Loading">
      <div className={styles.stack}>
        <div className={`${styles.shimmer} ${styles.title}`} />
        <div className={`${styles.shimmer} ${styles.line}`} />
        <div className={`${styles.shimmer} ${styles.card}`} />
      </div>
    </div>
  );
}

