<template>
  <aside class="sidebar" aria-label="Primary">
    <div class="sidebar__brand">
      <div class="sidebar__logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M3 12 12 3l9 9" />
          <path d="M5 10v10h14V10" />
        </svg>
      </div>
      <div class="sidebar__brand-text">
        <span class="sidebar__brand-name">MeshAnalytics</span>
        <span class="sidebar__brand-meta">Workspace · Acme Inc.</span>
      </div>
    </div>

    <nav class="sidebar__nav">
      <p class="sidebar__section">Insights</p>
      <a
        v-for="item in primary"
        :key="item.id"
        href="#"
        :class="['sidebar__link', { 'sidebar__link--active': item.id === active }]"
        @click.prevent
      >
        <BaseIcon :name="item.icon" :size="18" />
        <span>{{ item.label }}</span>
        <BaseBadge v-if="item.badge" tone="info">{{ item.badge }}</BaseBadge>
      </a>

      <p class="sidebar__section">Workspace</p>
      <a
        v-for="item in secondary"
        :key="item.id"
        href="#"
        class="sidebar__link"
        @click.prevent
      >
        <BaseIcon :name="item.icon" :size="18" />
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">AM</div>
        <div class="sidebar__user-meta">
          <span class="sidebar__user-name">Alex Morgan</span>
          <span class="sidebar__user-role">Revenue Ops</span>
        </div>
      </div>
      <button class="sidebar__icon-btn" aria-label="Sign out">
        <BaseIcon name="logout" :size="16" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import BaseIcon from "../ui/BaseIcon.vue";
import BaseBadge from "../ui/BaseBadge.vue";

defineProps({
  active: { type: String, default: "dashboard" }
});

const primary = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "reports", label: "Reports", icon: "reports", badge: "New" },
  { id: "customers", label: "Customers", icon: "customers" },
  { id: "segments", label: "Segments", icon: "segments" }
];

const secondary = [{ id: "settings", label: "Settings", icon: "settings" }];
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, var(--color-sidebar) 0%, var(--color-sidebar-elevated) 100%);
  color: var(--color-sidebar-text);
  display: flex;
  flex-direction: column;
  padding: var(--space-6) var(--space-4);
  width: 248px;
  flex-shrink: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.04);
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-2);
  margin-bottom: var(--space-8);
}

.sidebar__logo {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  display: grid;
  place-items: center;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.45);
}

.sidebar__brand-text {
  display: flex;
  flex-direction: column;
}

.sidebar__brand-name {
  font-weight: 700;
  font-size: var(--text-base);
  color: #ffffff;
}

.sidebar__brand-meta {
  font-size: var(--text-xs);
  color: var(--color-sidebar-muted);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.sidebar__section {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sidebar-muted);
  margin: var(--space-5) var(--space-2) var(--space-2);
}

.sidebar__section:first-child {
  margin-top: 0;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 9px var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-sidebar-text);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: background var(--transition-fast), color var(--transition-fast);
  position: relative;
}

.sidebar__link span:first-of-type {
  flex: 1;
}

.sidebar__link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.sidebar__link--active {
  background: rgba(99, 102, 241, 0.18);
  color: #ffffff;
  box-shadow: inset 2px 0 0 var(--color-primary);
}

.sidebar__footer {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
  min-width: 0;
}

.sidebar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  display: grid;
  place-items: center;
  font-size: var(--text-sm);
  font-weight: 700;
  color: #ffffff;
}

.sidebar__user-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sidebar__user-name {
  color: #ffffff;
  font-size: var(--text-sm);
  font-weight: 600;
}

.sidebar__user-role {
  color: var(--color-sidebar-muted);
  font-size: var(--text-xs);
}

.sidebar__icon-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  color: var(--color-sidebar-muted);
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.sidebar__icon-btn:hover {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.18);
}

@media (max-width: 1024px) {
  .sidebar {
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding: var(--space-3) var(--space-4);
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .sidebar__nav,
  .sidebar__footer,
  .sidebar__section {
    display: none;
  }

  .sidebar__brand {
    margin: 0;
  }
}
</style>
