<template>
  <Transition name="toast">
    <div v-if="toast" class="toast" :class="`toast--${toast.tone}`" role="status">
      <p>{{ toast.message }}</p>
      <button type="button" class="toast__close" aria-label="Dismiss" @click="clearToast">×</button>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from "vue";
import { useUi } from "../../composables/useUi.js";

const { toast, clearToast } = useUi();

let timer;

watch(
  toast,
  (next) => {
    if (timer) clearTimeout(timer);
    if (!next) return;
    timer = setTimeout(() => clearToast(), 3200);
  },
  { deep: true }
);
</script>

<style scoped>
.toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1200;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(360px, calc(100vw - 32px));
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: #000;
  color: #fff;
  box-shadow: var(--shadow-md);
  font-size: 13px;
}

.toast--success {
  background: #0f3d24;
}

.toast--info {
  background: #111;
}

.toast__close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  line-height: 1;
  padding: 0 2px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 600px) {
  .toast {
    left: 16px;
    right: 16px;
    bottom: 16px;
    max-width: none;
  }
}
</style>
