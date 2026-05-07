<template>
  <article class="kpi-card">
    <p class="kpi-label">{{ title }}</p>
    <h3 class="kpi-value">{{ value }}</h3>
    <p class="kpi-trend" :class="{ positive: trend >= 0, negative: trend < 0 }">
      {{ trend >= 0 ? "+" : "" }}{{ trend }}% vs last period
    </p>
  </article>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  trend: { type: Number, required: true }
});
</script>
