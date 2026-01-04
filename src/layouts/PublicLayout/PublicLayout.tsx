import type { PropsWithChildren } from "react";
import clockImage from "@rt/assets/images/clock.png";
import styles from "./PublicLayout.module.scss";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.publicLayoutContainer}>
      <div className={styles.children}>{children}</div>
      <div className={styles.onBoardingImageContainer}>
        <img src={clockImage} alt="Private Page Image" />
      </div>
    </div>
  );
}
