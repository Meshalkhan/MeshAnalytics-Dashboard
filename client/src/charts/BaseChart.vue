<template>
  <component :is="chartComponent" :data="data" :options="mergedOptions" />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  chartComponent: { type: Object, required: true },
  data: { type: Object, required: true },
  options: { type: Object, default: () => ({}) }
});

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: 4 },
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: {
      align: "end",
      labels: {
        color: "#475569",
        usePointStyle: true,
        boxWidth: 6,
        boxHeight: 6,
        padding: 16,
        font: { size: 12, family: "Inter, sans-serif" }
      }
    },
    tooltip: {
      backgroundColor: "#0f172a",
      titleColor: "#e2e8f0",
      bodyColor: "#e2e8f0",
      padding: 10,
      cornerRadius: 8,
      displayColors: false
    }
  },
  scales: {
    x: {
      ticks: { color: "#94a3b8", font: { size: 11, family: "Inter, sans-serif" } },
      grid: { display: false },
      border: { display: false }
    },
    y: {
      ticks: { color: "#94a3b8", font: { size: 11, family: "Inter, sans-serif" } },
      grid: { color: "rgba(148, 163, 184, 0.15)" },
      border: { display: false }
    }
  }
};

const mergedOptions = computed(() => {
  const overrides = props.options || {};
  return {
    ...baseOptions,
    ...overrides,
    plugins: {
      ...baseOptions.plugins,
      ...(overrides.plugins || {}),
      legend: { ...baseOptions.plugins.legend, ...(overrides.plugins?.legend || {}) },
      tooltip: { ...baseOptions.plugins.tooltip, ...(overrides.plugins?.tooltip || {}) }
    },
    scales: overrides.scales === undefined ? baseOptions.scales : overrides.scales
  };
});
</script>
