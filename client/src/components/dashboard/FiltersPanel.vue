<template>
  <BaseCard title="Filters" subtitle="Refine the dataset" class="filters">
    <div class="filters__group">
      <BaseSelect
        v-model="local.period"
        label="Period"
        :options="PERIOD_OPTIONS"
      />
      <BaseSelect
        v-model="local.region"
        label="Region"
        :options="REGION_OPTIONS"
      />
      <BaseSelect
        v-model="local.segment"
        label="Segment"
        :options="SEGMENT_OPTIONS"
      />
    </div>

    <div class="filters__actions">
      <BaseButton variant="primary" :loading="loading" @click="apply">Apply filters</BaseButton>
      <BaseButton variant="ghost" :disabled="loading" @click="reset">Reset</BaseButton>
    </div>

    <p v-if="lastUpdated" class="filters__meta">
      Updated {{ relativeUpdated }}
    </p>
  </BaseCard>
</template>

<script setup>
import { computed, reactive, watch } from "vue";
import BaseCard from "../ui/BaseCard.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseButton from "../ui/BaseButton.vue";
import {
  PERIOD_OPTIONS,
  REGION_OPTIONS,
  SEGMENT_OPTIONS
} from "../../constants/filters.js";

const props = defineProps({
  filters: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  lastUpdated: { type: String, default: "" }
});

const emit = defineEmits(["apply", "reset"]);

const local = reactive({ ...props.filters });

watch(
  () => props.filters,
  (next) => {
    local.period = next.period;
    local.region = next.region;
    local.segment = next.segment;
  },
  { deep: true }
);

const apply = () => emit("apply", { ...local });
const reset = () => emit("reset");

const relativeUpdated = computed(() => {
  if (!props.lastUpdated) return "";
  const diffSec = Math.max(0, Math.round((Date.now() - new Date(props.lastUpdated).getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  return `${diffHr}h ago`;
});
</script>

<style scoped>
.filters__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.filters__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.filters__meta {
  margin-top: var(--space-4);
  font-size: var(--text-xs);
  color: var(--color-text-subtle);
}
</style>
