import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Skeleton.module.scss";

type Variant = "summary" | "card-lg" | "card-md" | "card-sm";

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
};

export default function Skeleton({
  variant = "card-md",
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(styles.skeleton, styles[variant], className)}
      aria-busy="true"
      {...props}
    />
  );
}

