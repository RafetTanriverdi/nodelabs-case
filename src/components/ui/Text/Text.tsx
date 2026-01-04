import React from "react";
import clsx from "clsx";
import styles from "./Text.module.scss";

type Variant = "title" | "subtitle" | "label" | "hint" | "link";

type OwnProps = {
  variant?: Variant;
  muted?: boolean;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
};

type PolymorphicProps<E extends React.ElementType> = OwnProps & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof OwnProps | "as">;

export default function Text<E extends React.ElementType = "p">(
  props: PolymorphicProps<E>
) {
  const {
    as,
    variant = "hint",
    muted,
    error,
    className,
    children,
    ...rest
  } = props;

  const Component = (as || defaultTag(variant)) as React.ElementType;

  return (
    <Component
      className={clsx(
        styles.text,
        styles[variant],
        muted && styles.muted,
        error && styles.error,
        className
      )}
      {...(rest as React.ComponentPropsWithoutRef<E>)}
    >
      {children}

      {variant === "link" && (
        <svg
          className={styles.linkUnderline}
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* TERS YAY (∩) — stroke kalınlığı her yerde aynı */}
          <path
            d="M5 15 Q50 2 95 15"
            fill="none"
            stroke="#c7f000"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </Component>
  );
}

function defaultTag(v: Variant) {
  if (v === "title") return "h1";
  if (v === "label") return "label";
  if (v === "link") return "a";
  return "p";
}
