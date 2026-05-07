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
  plugins: {
    legend: {
      labels: {
        color: "#334155",
        boxWidth: 14
      }
    },
    tooltip: {
      backgroundColor: "#0f172a",
      padding: 10
    }
  },
  scales: {
    x: {
      ticks: { color: "#64748b" },
      grid: { color: "#e2e8f0" }
    },
    y: {
      ticks: { color: "#64748b" },
      grid: { color: "#e2e8f0" }
    }
  }
};

const mergedOptions = computed(() => ({
  ...baseOptions,
  ...props.options,
  plugins: {
    ...baseOptions.plugins,
    ...(props.options.plugins || {})
  }
}));
</script>
