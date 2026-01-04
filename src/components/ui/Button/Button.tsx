import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "secondary";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export default function Button({
  variant,
  loading = false,
  children,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const className =
    variant === "primary" ? styles.primaryButton : styles.secondaryButton;

  return (
    <button className={className} disabled={disabled || loading} {...props}>
      {icon}
      {variant === "primary" && loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
}
