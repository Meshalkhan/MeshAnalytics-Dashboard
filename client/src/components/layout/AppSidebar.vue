<template>
  <aside class="sidebar" :class="{ 'sidebar--open': open }" aria-label="Primary">
    <div class="sidebar__brand">
      <div class="sidebar__logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M3 12 12 3l9 9" />
          <path d="M5 10v10h14V10" />
        </svg>
      </div>
      <div class="sidebar__brand-text">
        <span class="sidebar__brand-name">MeshAnalytics</span>
        <span class="sidebar__brand-meta">Workspace · Mesh Inc.</span>
      </div>
      <button
        type="button"
        class="sidebar__close"
        aria-label="Close navigation"
        @click="closeSidebar"
      >
        <BaseIcon name="close" :size="18" />
      </button>
    </div>

    <nav class="sidebar__nav">
      <p class="sidebar__section">Insights</p>
      <button
        v-for="item in primary"
        :key="item.id"
        type="button"
        :class="['sidebar__link', { 'sidebar__link--active': item.id === active }]"
        @click="onNavigate(item.id)"
      >
        <BaseIcon :name="item.icon" :size="18" />
        <span>{{ item.label }}</span>
        <BaseBadge v-if="item.badge" tone="info">{{ item.badge }}</BaseBadge>
      </button>

      <p class="sidebar__section">Workspace</p>
      <button
        v-for="item in secondary"
        :key="item.id"
        type="button"
        :class="['sidebar__link', { 'sidebar__link--active': item.id === active }]"
        @click="onNavigate(item.id)"
      >
        <BaseIcon :name="item.icon" :size="18" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">AM</div>
        <div class="sidebar__user-meta">
          <span class="sidebar__user-name">Meshal Khan</span>
          <span class="sidebar__user-role">Admin</span>
        </div>
      </div>
      <button type="button" class="sidebar__icon-btn" aria-label="Sign out" @click="onSignOut">
        <BaseIcon name="logout" :size="16" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import BaseIcon from "../ui/BaseIcon.vue";
import BaseBadge from "../ui/BaseBadge.vue";
import { useUi } from "../../composables/useUi.js";

defineProps({
  active: { type: String, default: "dashboard" },
  open: { type: Boolean, default: false }
});

const { setActiveNav, closeSidebar, signOut, showToast } = useUi();

const primary = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "reports", label: "Reports", icon: "reports", badge: "New" },
  { id: "customers", label: "Customers", icon: "customers" },
  { id: "segments", label: "Segments", icon: "segments" }
];

const secondary = [{ id: "settings", label: "Settings", icon: "settings" }];

function onNavigate(id) {
  setActiveNav(id);
  if (id !== "dashboard") {
    showToast(`Opened ${id.charAt(0).toUpperCase() + id.slice(1)}.`, "info");
  }
}

function onSignOut() {
  signOut();
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: var(--color-sidebar);
  color: var(--color-sidebar-text);
  display: flex;
  flex-direction: column;
  padding: var(--space-4) 0 var(--space-6);
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid var(--color-sidebar-border);
  z-index: 100;
  box-sizing: border-box;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 12px;
  margin-bottom: var(--space-6);
}

.sidebar__logo {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  display: grid;
  place-items: center;
  color: #ffffff;
  flex-shrink: 0;
}

.sidebar__brand-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.sidebar__brand-name {
  font-weight: var(--font-weight-header);
  font-size: 14px;
  color: var(--color-text);
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.sidebar__brand-meta {
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.3px;
  line-height: 1.2;
}

.sidebar__close {
  display: none;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  place-items: center;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
}

.sidebar__section {
  font-size: 12px;
  font-weight: var(--font-weight-label);
  letter-spacing: 0.3px;
  color: var(--color-sidebar-muted);
  margin: var(--space-5) 10px var(--space-2);
}

.sidebar__section:first-child {
  margin-top: 0;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-sidebar-text);
  font-size: 14px;
  font-weight: 400;
  font-family: inherit;
  text-align: left;
  transition: all var(--transition-fast);
  width: 100%;
  box-sizing: border-box;
}

.sidebar__link span:first-of-type {
  flex: 1;
}

.sidebar__link:hover {
  background: var(--color-sidebar-hover);
  color: var(--color-text);
  font-weight: var(--font-weight-label);
}

.sidebar__link--active {
  background: var(--color-sidebar-active);
  color: var(--color-sidebar-active-text);
}

.sidebar__link--active:hover {
  background: var(--color-sidebar-active);
  color: var(--color-sidebar-active-text);
}

.sidebar__footer {
  margin-top: auto;
  padding: var(--space-6) var(--space-6) 0;
  border-top: 1px solid var(--color-border);
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
  background: var(--color-text);
  display: grid;
  place-items: center;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-header);
  color: #ffffff;
}

.sidebar__user-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sidebar__user-name {
  color: var(--color-text);
  font-size: 14px;
  font-weight: var(--font-weight-header);
}

.sidebar__user-role {
  color: var(--color-text-muted);
  font-size: 12px;
}

.sidebar__icon-btn {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  transition: all var(--transition-fast);
}

.sidebar__icon-btn:hover {
  background: var(--color-bg-div);
  color: var(--color-text);
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: min(300px, 88vw);
    transform: translateX(-105%);
    transition: transform 0.22s ease;
    box-shadow: var(--shadow-lg);
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar__close {
    display: grid;
  }

  .sidebar__brand {
    margin-bottom: var(--space-4);
  }
}
</style>
