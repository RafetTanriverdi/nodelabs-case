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

export default function Sidebar({ onLogout }: { onLogout?: () => void }) {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <img src={logo} alt="Brand Logo" className={styles.brand} />

      <nav className={styles.nav} aria-label="Main navigation">
        {mainItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
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
        <a className={styles.footerItem} href="/help">
          <span className={styles.icon} aria-hidden="true">
            <HiQuestionMarkCircle />
          </span>
          <span className={styles.label}>Help</span>
        </a>

        <button type="button" className={styles.footerItem} onClick={onLogout}>
          <span className={styles.icon} aria-hidden="true">
            <HiOutlineArrowRightStartOnRectangle />
          </span>
          <span className={styles.label}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
