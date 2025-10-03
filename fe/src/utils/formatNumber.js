export function formatNumber(value, locale = "en-US") {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat(locale).format(num);
}

export default formatNumber;


