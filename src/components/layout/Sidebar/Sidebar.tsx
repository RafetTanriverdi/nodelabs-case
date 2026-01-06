import React from "react";
import styles from "./Sidebar.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import logo from "@rt/assets/images/logo.png";
import {
  HiBookmark,
  HiCog6Tooth,
  HiHome,
  HiOutlineArrowRightStartOnRectangle,
  HiPresentationChartLine,
  HiQuestionMarkCircle,
  HiWallet,
  HiXMark,
} from "react-icons/hi2";

type SidebarItem = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const mainItems: SidebarItem[] = [
  { to: "/", label: "Dashboard", icon: <HiHome /> },
  {
    to: "/transactions",
    label: "Transactions",
    icon: <HiPresentationChartLine />,
  },
  { to: "/invoices", label: "Invoices", icon: <HiBookmark /> },
  { to: "/wallets", label: "My Wallets", icon: <HiWallet /> },
  { to: "/settings", label: "Settings", icon: <HiCog6Tooth /> },
];

type Props = {
  id?: string;
  onLogout?: () => void;
  onNavigate?: () => void;
  onClose?: () => void;
  className?: string;
};

export default function Sidebar({
  id,
  onLogout,
  onNavigate,
  onClose,
  className,
}: Props) {
  const handleLogout = () => {
    onLogout?.();
    onNavigate?.();
  };

  return (
    <aside id={id} className={clsx(styles.sidebar, className)} aria-label="Sidebar">
      <div className={styles.topRow}>
        <img src={logo} alt="Brand Logo" className={styles.brand} />

        {onClose ? (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <HiXMark aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
        {mainItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(styles.navItem, isActive && styles.active)
            }
          >
            <span className={styles.icon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <a className={styles.footerItem} href="/help" onClick={onNavigate}>
          <span className={styles.icon} aria-hidden="true">
            <HiQuestionMarkCircle />
          </span>
          <span className={styles.label}>Help</span>
        </a>

        <button
          type="button"
          className={styles.footerItem}
          onClick={handleLogout}
        >
          <span className={styles.icon} aria-hidden="true">
            <HiOutlineArrowRightStartOnRectangle />
          </span>
          <span className={styles.label}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
