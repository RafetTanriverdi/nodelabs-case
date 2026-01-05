export function formatDateLabel(iso: string, locale: string) {
  const d = new Date(iso);

  const datePart = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(d);

  const timePart = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

  return `${datePart} at ${timePart}`;
}
