import styles from "./PageLoader.module.scss";

export default function PageLoader() {
  return (
    <div
      className={styles.container}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className={styles.spinner} />
    </div>
  );
}
