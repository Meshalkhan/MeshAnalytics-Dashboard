<template>
  <label class="select">
    <span v-if="label" class="select__label">{{ label }}</span>
    <span class="select__field">
      <select :value="modelValue" @change="onChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <span class="select__chevron" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], required: true },
  options: { type: Array, required: true },
  label: { type: String, default: "" }
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => emit("update:modelValue", event.target.value);
</script>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.select__label {
  font-weight: 500;
  color: var(--color-text);
}

.select__field {
  position: relative;
  display: block;
}

.select__field select {
  appearance: none;
  width: 100%;
  padding: 9px 36px 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  font-size: var(--text-sm);
  color: var(--color-text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.select__field select:hover {
  border-color: var(--color-border-strong);
}

.select__field select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
  outline: none;
}

.select__chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-subtle);
  pointer-events: none;
  display: inline-flex;
}
</style>
