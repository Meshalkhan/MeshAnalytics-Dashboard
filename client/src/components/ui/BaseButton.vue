<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading, 'btn--icon': iconOnly }]"
    v-bind="$attrs"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot v-else name="leading" />
    <span v-if="$slots.default" class="btn__label"><slot /></span>
    <slot name="trailing" />
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  type: { type: String, default: "button" },
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary", "ghost", "danger"].includes(v)
  },
  size: { type: String, default: "md", validator: (v) => ["sm", "md"].includes(v) },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false }
});
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.01em;
  transition: background var(--transition-fast), border-color var(--transition-fast),
    color var(--transition-fast), transform var(--transition-fast);
  white-space: nowrap;
}

.btn--md {
  padding: 9px 14px;
}

.btn--sm {
  padding: 6px 10px;
  font-size: var(--text-xs);
}

.btn--icon {
  padding: 8px;
}

.btn--primary {
  background: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.32);
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-strong);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--color-surface-muted);
  border-color: var(--color-border-strong);
}

.btn--ghost {
  background: transparent;
  color: var(--color-text-muted);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.btn--danger {
  background: var(--color-danger);
  color: #ffffff;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: btn-spin 0.7s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
