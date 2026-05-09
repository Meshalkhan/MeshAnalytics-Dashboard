<template>
  <div class="app-shell">
    <AppSidebar :active="activeNav" />
    <div class="app-shell__main">
      <slot name="topbar" />
      <main class="app-shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "./AppSidebar.vue";

defineProps({
  activeNav: { type: String, default: "dashboard" }
});
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.app-shell__content {
  flex: 1;
  padding: var(--space-6);
  overflow-x: hidden;
}

@media (max-width: 1024px) {
  .app-shell {
    flex-direction: column;
  }
}
</style>
