export const PAYMENT_TYPE_LABELS = {
  CASH: "Cash",
  CREDIT: "Credit",
};

export function mapPaymentTypeToLabel(value) {
  if (!value) return "-";
  const key = String(value).toUpperCase();
  return PAYMENT_TYPE_LABELS[key] ?? "Else";
}

export default mapPaymentTypeToLabel;


