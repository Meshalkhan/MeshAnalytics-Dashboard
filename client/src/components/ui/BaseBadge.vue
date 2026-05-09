<template>
  <span :class="['badge', `badge--${tone}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    default: "neutral",
    validator: (v) => ["neutral", "success", "danger", "info"].includes(v)
  }
});
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.01em;
}

.badge--neutral {
  background: var(--color-surface-muted);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.badge--success {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.badge--danger {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

.badge--info {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}
</style>
