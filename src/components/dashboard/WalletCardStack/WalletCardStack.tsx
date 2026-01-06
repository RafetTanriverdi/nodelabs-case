import { FcSimCardChip } from "react-icons/fc";
import {
  HiEllipsisHorizontal,
  HiOutlineExclamationTriangle,
  HiOutlineWifi,
} from "react-icons/hi2";
import styles from "./WalletCardStack.module.scss";

import visaPng from "@rt/assets/images/visa.png";
import mastercardPng from "@rt/assets/images/mastercard.png";
import Skeleton from "@rt/components/ui/Skeleton/Skeleton";
import ErrorState from "@rt/components/ui/ErrorState/ErrorState";
import Button from "@rt/components/ui/Button/Button";

export type CardData = {
  brand: string;
  bank: string;
  cardNumber: string;
  expiryMonth?: string;
  expiryYear?: string;
  network?: "Visa" | "Mastercard";
};

type Props = {
  title?: string;
  topCard: CardData;
  bottomCard: CardData;
  onMenuClick?: () => void;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
};

function networkSrc(network?: CardData["network"]) {
  if (network === "Mastercard") return mastercardPng;
  return visaPng; // default VISA
}

export default function WalletCardStack({
  title = "Wallet",
  topCard,
  bottomCard,
  onMenuClick,
  isLoading,
  error,
  onRetry,
}: Props) {
  if (isLoading) {
    return <Skeleton variant="card-sm" aria-label="Loading wallet" />;
  }

  if (error) {
    return (
      <section className={styles.walletSection} aria-label="Wallet">
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.stateWrap}>
          <ErrorState
            variant="inline"
            icon={<HiOutlineExclamationTriangle aria-hidden="true" />}
            title="Wallet unavailable"
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
    <section className={styles.walletSection} aria-label="Wallet">
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        <button
          type="button"
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Wallet menu"
        >
          <HiEllipsisHorizontal />
        </button>
      </div>

      <div className={styles.stack}>
        {/* TOP DARK CARD */}
        <div className={styles.cardDark}>
          <div className={styles.cardInner}>
            <div className={styles.cardHead}>
              <div className={styles.brandRow}>
                <span className={styles.bankDark}>{topCard.bank}</span>
              </div>
            </div>

            <div className={styles.rowIcons}>
              <div className={styles.chipIconDark}>
                <FcSimCardChip />
              </div>

              <HiOutlineWifi className={styles.contactlessDarkIcon} />
            </div>

            <div className={styles.numberDark}>{topCard.cardNumber}</div>
            <div>
              <div className={styles.bottomRow}>
                <div className={styles.expiryMonth}>
                  {topCard.expiryMonth}/{topCard.expiryYear}
                </div>
                <img
                  className={styles.networkLogo}
                  src={networkSrc(topCard.network)}
                  alt={topCard.network ?? "MASTERCARD"}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LIGHT CARD */}
        <div className={styles.cardLight}>
          <div className={styles.cardInner}>
            <div className={styles.cardHead}>
              <div className={styles.brandRow}>
                <span className={styles.bankLight}>{bottomCard.bank}</span>
              </div>
            </div>

            <div className={styles.rowIcons}>
              <div className={styles.chipIcon}>
                <FcSimCardChip />
              </div>

              <HiOutlineWifi className={styles.contactlessLightIcon} />
            </div>

            <div className={styles.numberLight}>{bottomCard.cardNumber}</div>

            <div className={styles.bottomRow}>
              <div className={styles.expiryMonth}>
                {bottomCard.expiryMonth}/{bottomCard.expiryYear}
              </div>

              <img
                className={styles.networkLogo}
                src={networkSrc(bottomCard.network)}
                alt={bottomCard.network ?? "VISA"}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
