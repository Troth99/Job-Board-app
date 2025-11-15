


export function formatDate(dateString: string, locale: string = "en-US"): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}