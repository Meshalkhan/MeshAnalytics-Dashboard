const periodFactorMap = {
  "7d": 0.25,
  "30d": 1,
  "90d": 2.7
};

const regionFactorMap = {
  all: 1,
  "north-america": 1.14,
  emea: 0.95,
  apac: 1.08,
  latam: 0.87
};

const segmentFactorMap = {
  all: 1,
  enterprise: 1.22,
  "mid-market": 1,
  smb: 0.78
};

function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

function getFactor(filters) {
  const period = periodFactorMap[filters.period] || periodFactorMap["30d"];
  const region = regionFactorMap[filters.region] || regionFactorMap.all;
  const segment = segmentFactorMap[filters.segment] || segmentFactorMap.all;
  return period * region * segment;
}

export function buildDashboardPayload(query) {
  const filters = {
    period: query.period || "30d",
    region: query.region || "all",
    segment: query.segment || "all"
  };

  const factor = getFactor(filters);

  const kpis = [
    { title: "Total Revenue", value: formatCurrency(1200000 * factor), trend: 8.6 },
    { title: "Active Accounts", value: `${Math.round(840 * factor)}`, trend: 4.2 },
    { title: "Avg. Deal Size", value: formatCurrency(14200 * factor), trend: -1.4 },
    { title: "Conversion Rate", value: formatPercent(19.7 * (0.8 + factor / 3.2)), trend: 2.9 }
  ];

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
  const revenueBase = [160, 180, 210, 235, 260, 290].map((v) => Math.round(v * factor));
  const pipelineBase = [150, 175, 198, 220, 248, 280].map((v) => Math.round(v * (factor * 0.95)));

  const charts = {
    revenueTrend: {
      labels,
      datasets: [
        {
          label: "Revenue (k)",
          data: revenueBase,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          tension: 0.35,
          fill: true
        },
        {
          label: "Pipeline (k)",
          data: pipelineBase,
          borderColor: "#0ea5e9",
          backgroundColor: "rgba(14, 165, 233, 0.16)",
          tension: 0.35,
          fill: true
        }
      ]
    },
    channelPerformance: {
      labels: ["Paid Search", "Direct", "Partners", "Outbound", "Email"],
      datasets: [
        {
          label: "Leads",
          data: [98, 132, 88, 77, 95].map((v) => Math.round(v * factor)),
          backgroundColor: ["#2563eb", "#0ea5e9", "#8b5cf6", "#14b8a6", "#f59e0b"]
        }
      ]
    },
    segmentBreakdown: {
      labels: ["Enterprise", "Mid-Market", "SMB"],
      datasets: [
        {
          data: [47, 33, 20].map((v) => Math.max(5, Math.round(v * (0.6 + factor / 2.5)))),
          backgroundColor: ["#2563eb", "#0ea5e9", "#8b5cf6"]
        }
      ]
    }
  };

  const table = [
    { account: "Apex Holdings", region: "North America", revenue: formatCurrency(198000 * factor), conversionRate: "27.4%" },
    { account: "Bluewire Group", region: "EMEA", revenue: formatCurrency(173000 * factor), conversionRate: "22.8%" },
    { account: "CoreBridge", region: "APAC", revenue: formatCurrency(161000 * factor), conversionRate: "24.9%" },
    { account: "Delta Vector", region: "LATAM", revenue: formatCurrency(124000 * factor), conversionRate: "19.2%" },
    { account: "Everstream Ltd", region: "North America", revenue: formatCurrency(110000 * factor), conversionRate: "18.6%" }
  ];

  return { filters, kpis, charts, table };
}
