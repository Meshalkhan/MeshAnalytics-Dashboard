import {
  formatCurrency,
  formatNumber,
  formatPercent
} from "../utils/formatters.js";

const PERIOD_FACTORS = { "7d": 0.25, "30d": 1, "90d": 2.7 };
const REGION_FACTORS = {
  all: 1,
  "north-america": 1.14,
  emea: 0.95,
  apac: 1.08,
  latam: 0.87
};
const SEGMENT_FACTORS = {
  all: 1,
  enterprise: 1.22,
  "mid-market": 1,
  smb: 0.78
};

const PALETTE = {
  primary: "#6366f1",
  primarySoft: "rgba(99, 102, 241, 0.18)",
  accent: "#22d3ee",
  accentSoft: "rgba(34, 211, 238, 0.16)",
  series: ["#6366f1", "#22d3ee", "#a855f7", "#10b981", "#f59e0b"]
};

const computeFactor = ({ period, region, segment }) =>
  PERIOD_FACTORS[period] * REGION_FACTORS[region] * SEGMENT_FACTORS[segment];

const buildKpis = (factor) => [
  {
    id: "revenue",
    title: "Total Revenue",
    value: formatCurrency(1_200_000 * factor),
    trend: 8.6,
    helper: "vs previous period"
  },
  {
    id: "accounts",
    title: "Active Accounts",
    value: formatNumber(840 * factor),
    trend: 4.2,
    helper: "paying customers"
  },
  {
    id: "deal-size",
    title: "Avg. Deal Size",
    value: formatCurrency(14_200 * factor),
    trend: -1.4,
    helper: "rolling 30-day"
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: formatPercent(19.7 * (0.8 + factor / 3.2)),
    trend: 2.9,
    helper: "lead to opportunity"
  }
];

const buildCharts = (factor) => {
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
  const revenueSeries = [160, 180, 210, 235, 260, 290].map((v) =>
    Math.round(v * factor)
  );
  const pipelineSeries = [150, 175, 198, 220, 248, 280].map((v) =>
    Math.round(v * factor * 0.95)
  );

  return {
    revenueTrend: {
      labels,
      datasets: [
        {
          label: "Revenue (k)",
          data: revenueSeries,
          borderColor: PALETTE.primary,
          backgroundColor: PALETTE.primarySoft,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: PALETTE.primary,
          pointBorderColor: "#ffffff",
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: "Pipeline (k)",
          data: pipelineSeries,
          borderColor: PALETTE.accent,
          backgroundColor: PALETTE.accentSoft,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: PALETTE.accent,
          pointBorderColor: "#ffffff",
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },
    channelPerformance: {
      labels: ["Paid Search", "Direct", "Partners", "Outbound", "Email"],
      datasets: [
        {
          label: "Leads",
          data: [98, 132, 88, 77, 95].map((v) => Math.round(v * factor)),
          backgroundColor: PALETTE.series,
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 36
        }
      ]
    },
    segmentBreakdown: {
      labels: ["Enterprise", "Mid-Market", "SMB"],
      datasets: [
        {
          data: [47, 33, 20].map((v) =>
            Math.max(5, Math.round(v * (0.6 + factor / 2.5)))
          ),
          backgroundColor: PALETTE.series.slice(0, 3),
          borderColor: "#ffffff",
          borderWidth: 4,
          hoverOffset: 6
        }
      ]
    }
  };
};

const buildTable = (factor) =>
  [
    { account: "Apex Holdings", region: "North America", base: 198_000, conversion: 27.4 },
    { account: "Bluewire Group", region: "EMEA", base: 173_000, conversion: 22.8 },
    { account: "CoreBridge", region: "APAC", base: 161_000, conversion: 24.9 },
    { account: "Delta Vector", region: "LATAM", base: 124_000, conversion: 19.2 },
    { account: "Everstream Ltd", region: "North America", base: 110_000, conversion: 18.6 }
  ].map((row, index) => ({
    id: index + 1,
    account: row.account,
    region: row.region,
    revenue: formatCurrency(row.base * factor),
    conversionRate: formatPercent(row.conversion)
  }));

export function getDashboardSnapshot(filters) {
  const factor = computeFactor(filters);
  return {
    filters,
    generatedAt: new Date().toISOString(),
    kpis: buildKpis(factor),
    charts: buildCharts(factor),
    table: buildTable(factor)
  };
}
