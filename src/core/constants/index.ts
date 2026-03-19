export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(price: number): string {
  return CURRENCY_FORMATTER.format(price);
}
