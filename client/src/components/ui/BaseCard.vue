<template>
  <section :class="['card', { 'card--padded': padded }]">
    <header v-if="$slots.header || title" class="card__header">
      <div class="card__heading">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
        <slot name="header" />
      </div>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions" />
      </div>
    </header>
    <div class="card__body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  padded: { type: Boolean, default: true }
});
</script>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.card--padded .card__body {
  padding: var(--space-5);
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-5) 0;
}

.card--padded .card__header + .card__body {
  padding-top: var(--space-4);
}

.card__title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text);
}

.card__subtitle {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  margin-top: 2px;
}

.card__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
