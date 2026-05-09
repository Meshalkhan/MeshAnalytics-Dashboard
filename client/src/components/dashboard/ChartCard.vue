<template>
  <BaseCard :title="title" :subtitle="subtitle" class="chart-card">
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    <div class="chart-card__canvas">
      <BaseSkeleton v-if="loading" :height="`${height}px`" />
      <slot v-else />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "../ui/BaseCard.vue";
import BaseSkeleton from "../ui/BaseSkeleton.vue";

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  loading: { type: Boolean, default: false },
  height: { type: Number, default: 280 }
});
</script>

<style scoped>
.chart-card__canvas {
  position: relative;
  height: 280px;
}
</style>
