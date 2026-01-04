type Currency = "TRY" | "USD" | "EUR" | string;

export function formatMoney(
  value: number,
  currency: Currency,
  options?: {
    locale?: string;
    maximumFractionDigits?: number;
  }
) {
  const locale =
    options?.locale ??
    (currency === "TRY" ? "tr-TR" : currency === "USD" ? "en-US" : undefined);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(value);
}
