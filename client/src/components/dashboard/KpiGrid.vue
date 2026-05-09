<template>
  <div class="kpi-grid">
    <template v-if="loading && !kpis.length">
      <KpiCard v-for="n in 4" :key="n" loading />
    </template>
    <template v-else>
      <KpiCard
        v-for="kpi in kpis"
        :key="kpi.id"
        :title="kpi.title"
        :value="kpi.value"
        :trend="kpi.trend"
        :helper="kpi.helper"
      />
    </template>
  </div>
</template>

<script setup>
import KpiCard from "./KpiCard.vue";

defineProps({
  kpis: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
});
</script>

<style scoped>
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
}

@media (max-width: 1180px) {
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
