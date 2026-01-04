import { type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  touched?: boolean;
  error?: string;
};

export default function Input({ label, name, touched,
  className,
  error, ...props }: InputProps) {

  const showError = Boolean(touched && error)
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} className={[
        styles.input,
        showError ? styles.inputError : "",
        className ?? "",
      ].join(" ")}
        {...props}
      />
      {showError && <div className={styles.errorText}>{error}</div>}
    </div>
  );
}
