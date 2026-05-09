const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1
});

const standardCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const standardNumber = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

export const formatCurrency = (value) => standardCurrency.format(Math.round(value));
export const formatCompactCurrency = (value) => compactCurrency.format(Math.round(value));
export const formatNumber = (value) => standardNumber.format(Math.round(value));
export const formatPercent = (value, fractionDigits = 1) => `${value.toFixed(fractionDigits)}%`;
