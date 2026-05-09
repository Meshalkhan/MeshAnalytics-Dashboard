<template>
  <div class="error-state" role="alert">
    <div class="error-state__icon">
      <BaseIcon name="alert" :size="22" />
    </div>
    <div class="error-state__copy">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>
    <BaseButton variant="primary" size="sm" @click="$emit('retry')">
      <template #leading><BaseIcon name="refresh" :size="14" /></template>
      Retry
    </BaseButton>
  </div>
</template>

<script setup>
import BaseIcon from "../ui/BaseIcon.vue";
import BaseButton from "../ui/BaseButton.vue";

defineProps({
  title: { type: String, default: "We couldn't load your dashboard" },
  message: { type: String, default: "Please retry, or check that the analytics service is online." }
});

defineEmits(["retry"]);
</script>

<style scoped>
.error-state {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--color-danger-soft);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: var(--radius-lg);
  color: var(--color-text);
}

.error-state__icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: rgba(239, 68, 68, 0.18);
  color: var(--color-danger);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.error-state__copy h3 {
  font-size: var(--text-sm);
  font-weight: 600;
}

.error-state__copy p {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}

.error-state__copy {
  flex: 1;
}
</style>
