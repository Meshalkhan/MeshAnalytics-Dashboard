<template>
  <article class="kpi" :class="{ 'kpi--loading': loading }">
    <header class="kpi__header">
      <p class="kpi__title">{{ title }}</p>
      <BaseBadge v-if="!loading" :tone="trend >= 0 ? 'success' : 'danger'">
        <BaseIcon :name="trend >= 0 ? 'arrowUp' : 'arrowDown'" :size="12" />
        {{ Math.abs(trend).toFixed(1) }}%
      </BaseBadge>
      <BaseSkeleton v-else width="56px" height="20px" rounded />
    </header>

    <div v-if="!loading" class="kpi__value">{{ value }}</div>
    <BaseSkeleton v-else width="60%" height="28px" />

    <p v-if="!loading && helper" class="kpi__helper">{{ helper }}</p>
    <BaseSkeleton v-else-if="loading" width="40%" height="12px" />
  </article>
</template>

<script setup>
import BaseBadge from "../ui/BaseBadge.vue";
import BaseIcon from "../ui/BaseIcon.vue";
import BaseSkeleton from "../ui/BaseSkeleton.vue";

defineProps({
  title: { type: String, default: "" },
  value: { type: String, default: "" },
  trend: { type: Number, default: 0 },
  helper: { type: String, default: "" },
  loading: { type: Boolean, default: false }
});
</script>

<style scoped>
.kpi {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-height: 130px;
}

.kpi__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.kpi__title {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 500;
}

.kpi__value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.kpi__helper {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}
</style>
