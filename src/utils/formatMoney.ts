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

export function formatMoneyTransfers(
  amount: number,
  currencySymbol: string,
  locale: string
) {
  const abs = Math.abs(amount);

  const n = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs);

  return `- ${currencySymbol}${n}`;
}
