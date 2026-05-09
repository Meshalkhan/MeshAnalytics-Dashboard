<template>
  <header class="topbar">
    <div class="topbar__heading">
      <p class="topbar__breadcrumb">{{ breadcrumb }}</p>
      <h1 class="topbar__title">{{ title }}</h1>
      <p v-if="subtitle" class="topbar__subtitle">{{ subtitle }}</p>
    </div>

    <div class="topbar__actions">
      <div class="topbar__search" role="search">
        <BaseIcon name="search" :size="16" />
        <input type="text" placeholder="Search accounts, KPIs, segments..." aria-label="Search" />
        <span class="topbar__hotkey">⌘K</span>
      </div>

      <button class="topbar__icon-btn" aria-label="Notifications">
        <BaseIcon name="bell" :size="18" />
        <span class="topbar__indicator" />
      </button>

      <slot name="actions" />
    </div>
  </header>
</template>

<script setup>
import BaseIcon from "../ui/BaseIcon.vue";

defineProps({
  breadcrumb: { type: String, default: "Workspace / Insights" },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" }
});
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-6);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.topbar__breadcrumb {
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.topbar__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-top: 4px;
}

.topbar__subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-top: 4px;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.topbar__search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  color: var(--color-text-subtle);
  width: 320px;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.topbar__search:focus-within {
  border-color: var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}

.topbar__search input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-text);
}

.topbar__hotkey {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-subtle);
}

.topbar__icon-btn {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  display: grid;
  place-items: center;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.topbar__icon-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.topbar__indicator {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 8px;
  height: 8px;
  background: var(--color-danger);
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}

@media (max-width: 880px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar__search {
    width: 100%;
  }

  .topbar__actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
